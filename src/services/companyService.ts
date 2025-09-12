import api, { CompanyApiResponse } from "@/lib/apiClient";

export async function fetchCompanies(params: Record<string, any>): Promise<CompanyApiResponse> {
    const res = await api.get("/company/search", { params }) as any;
    return res;
}
