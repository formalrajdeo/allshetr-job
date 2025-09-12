"use client";
import React, { useMemo, useState, useEffect } from "react";
import CompanyCategorySlider from "./CompanyCategorySlider";
import FilterSidebar from "./FilterSidebar";
import { GroupTagMap } from "@/app/types";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import CompanyGroups from "./CompanyGroups";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// ---- API fetcher ----
const fetchCompanies = async (currentPage: number) => {
    const response = await axios.get("http://localhost:5000/api/v1/company/search", {
        params: {
            seoKey: "/companies-hiring-in-india",
            urltype: "search_by_company_general",
            pageNo: currentPage,
            qcount: 48,
            searchType: "companySearch",
        },
        headers: {
            accept: "application/json",
            Authorization: "Bearer <your_token_here>", // TODO: Replace with actual token
        },
    });

    return response.data.data;
};

export default function CompanyPage() {
    const ITEMS_PER_PAGE = 48;

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

    // ✅ Reset page to 1 when category or filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, selectedFilters]);

    // ✅ Fetch companies with react-query
    const {
        data: res,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["companies", currentPage],
        queryFn: () => fetchCompanies(currentPage),
        // keepPreviousData: true, // keep showing old data while fetching new
    });

    const totalRecordsInDB = res?.noOfGroups || 0;

    const fieldMapping: Record<string, keyof GroupTagMap | "location" | "industry"> = {
        business_size: "businessSize",
        nature_of_business: "natureofBusiness",
        ownership_type: "ownershipType",
        employer_type: "employerType",
        offering_type: "offeringType",
        primary_industry: "primaryIndustry",
        employees_count: "employeesCount",
        founding_year: "foundingYear",
        top_company: "topCompany",
        hq: "hq",
        companyIndustry: "industry",
        allLocation: "location",
        allDept: "department",
        allExperience: "experience",
        dateBucket: "dateBucket",
    };

    const filteredCompanies = useMemo(() => {
        if (!res || !res.groupDetails) return [];

        let list = [...res.groupDetails];

        if (selectedCategory) {
            const normalizedCategory = selectedCategory.toLowerCase();
            list = list.filter((company: any) => {
                const tags = company.groupTags;
                if (!tags || typeof tags !== "object") return false;

                const allTagValues: string[] = Object.values(tags)
                    .flat()
                    .filter((val): val is string => typeof val === "string")
                    .map((val) => val.toLowerCase());

                return allTagValues.some((val) => val.includes(normalizedCategory));
            });
        }

        for (const filterId of Object.keys(selectedFilters)) {
            const selectedVals = selectedFilters[filterId];
            if (!selectedVals || selectedVals.length === 0) continue;

            const field = fieldMapping[filterId];
            if (!field) continue;

            list = list.filter((company: any) => {
                const tags = company.groupTags || {};

                if (field in tags) {
                    const tagValues = tags[field] || [];
                    return selectedVals.some((val) => tagValues.includes(val));
                }

                const value = (company as any)[field];
                if (!value) return false;

                return selectedVals.includes(value);
            });
        }

        return list;
    }, [res, selectedCategory, selectedFilters]);

    function onFilterChange(filterId: string, values: string[]) {
        setSelectedFilters((prev) => ({ ...prev, [filterId]: values }));
    }

    // ---- Render block ----
    return (
        <>
            <Navbar />
            <main className="flex justify-center py-10">
                <div className="w-11/12">
                    <h1 className="font-bold text-lg mb-6">Top companies hiring now</h1>

                    <CompanyCategorySlider setSelectedCategory={setSelectedCategory} />

                    {isLoading ? (
                        <p>Loading companies...</p>
                    ) : isError ? (
                        <p className="text-red-500">Failed to load companies</p>
                    ) : (
                        <div className="m-4 flex justify-between items-start w-11/12">
                            <FilterSidebar
                                clusterOrder={res.clusterOrder}
                                filters={res.clusters}
                                selectedFilters={selectedFilters}
                                onChange={onFilterChange}
                            />

                            <CompanyGroups
                                totalRecordsInDB={totalRecordsInDB}
                                filteredCompanies={filteredCompanies}
                                ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                setSelectedFilters={setSelectedFilters}
                            />
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
