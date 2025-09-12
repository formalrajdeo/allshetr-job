"use client";
import { useEffect, useState } from "react";
import { fetchCompanies } from "@/services/companyService";
import { CompanyApiResponse } from "@/lib/apiClient";

export function useCompanies(initialParams: Record<string, any>, initialData?: CompanyApiResponse) {
    const [params, setParams] = useState(initialParams);
    const [data, setData] = useState<CompanyApiResponse | null>(initialData ?? null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        if (!initialData) {
            loadCompanies(params);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function loadCompanies(p: Record<string, any>) {
        setLoading(true);
        setError(null);
        try {
            const res = await fetchCompanies(p);
            setData(res);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    return {
        data,
        loading,
        error,
        setParams,
        reload: (newParams: Record<string, any>) => {
            setParams(newParams);
            loadCompanies(newParams);
        },
    };
}
