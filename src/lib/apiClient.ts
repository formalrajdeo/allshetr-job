import axios, { AxiosError } from "axios";
import { z } from "zod";

// --- Zod schema for response validation ---
const CompanyGroupSchema = z.object({
    groupId: z.number(),
    groupName: z.string(),
    groupLogo: z.record(z.string(), z.string()).optional(),
    rating: z.number().optional(),
    noOfReviews: z.number().optional(),
    groupTags: z.record(z.string(), z.any()).optional(),
});

export const CompanyApiResponseSchema = z.object({
    // success: z.boolean(),
    clusterOrder: z.array(z.string()).optional(),
    clusters: z.record(z.string(), z.any()).optional(),
    groupDetails: z.array(CompanyGroupSchema),
});

export type CompanyApiResponse = z.infer<typeof CompanyApiResponseSchema>;

// --- Axios client ---
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api/v1",
    timeout: 10000,
});

// --- Request interceptor: attach token ---
api.interceptors.request.use(
    (config) => {
        const token = process.env.NEXT_PUBLIC_API_TOKEN;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers.accept = "application/json";
        return config;
    },
    (error) => Promise.reject(error)
);

// --- Response interceptor: validate & normalize ---
api.interceptors.response.use(
    (response): any => {
        try {
            // const parsed = CompanyApiResponseSchema.parse(response.data);
            const parsed = CompanyApiResponseSchema.parse(response.data.data);
            return parsed;
        } catch (err) {
            console.error("❌ Invalid API response", err);
            throw new Error("Invalid API response structure");
        }
    },
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            console.warn("⚠️ Unauthorized, handle logout flow");
            // e.g. redirect to login page
        }
        return Promise.reject({
            message: error.message,
            code: error.code,
            status: error.response?.status,
            data: error.response?.data,
        });
    }
);

export default api;