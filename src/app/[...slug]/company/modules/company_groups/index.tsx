"use client";
import React, {
    useMemo,
    useState,
    useEffect,
    Suspense,
    lazy,
} from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GroupTagMap } from "@/app/types";
import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";

// ✅ Lazy-loaded components for Suspense
const CompanyCategorySlider = lazy(() => import("./CompanyCategorySlider"));
const FilterSidebar = lazy(() => import("./FilterSidebar"));
const CompanyGroups = lazy(() => import("./CompanyGroups"));

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
            Authorization: "Bearer <your_token_here>", // replace with real token
        },
    });

    return response.data.data;
};

const SidebarSkeleton = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
);

const CompanyCardSkeleton = () => (
    <div className="bg-white p-4 border rounded shadow animate-pulse space-y-2">
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
);

export default function CompanyPage() {
    const ITEMS_PER_PAGE = 48;

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

    // Reset page on category/filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, selectedFilters]);

    // React Query: fetch companies
    const {
        data: res,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["companies", currentPage],
        queryFn: () => fetchCompanies(currentPage),
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
        if (!res?.groupDetails) return [];

        let list = [...res.groupDetails];

        if (selectedCategory) {
            const normalized = selectedCategory.toLowerCase();
            list = list.filter((company: any) => {
                const tags = company.groupTags;
                if (!tags || typeof tags !== "object") return false;

                const allTagValues = Object.values(tags)
                    .flat()
                    .filter((val): val is string => typeof val === "string")
                    .map((val) => val.toLowerCase());

                return allTagValues.some((val) => val.includes(normalized));
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
    console.log({ selectedCategory, selectedFilters })

    return (
        <>
            <Navbar />
            <main className="flex justify-center py-10">
                <div className="w-11/12">
                    <h1 className="font-bold text-lg mb-6">Top companies hiring now</h1>

                    <Suspense fallback={<div className="mb-4">Loading categories...</div>}>
                        <CompanyCategorySlider setSelectedCategory={setSelectedCategory} />
                    </Suspense>

                    {isLoading ? (
                        <p>Loading companies...</p>
                    ) : isError ? (
                        <p className="text-red-500">Failed to load companies</p>
                    ) : (
                        <div className="m-4 flex justify-between items-start w-11/12">
                            <div className="w-1/4">
                                {/* <Suspense fallback={<div>Loading sidebar...</div>}> */}
                                <Suspense fallback={<SidebarSkeleton />}>
                                    <FilterSidebar
                                        clusterOrder={res.clusterOrder}
                                        filters={res.clusters}
                                        selectedFilters={selectedFilters}
                                        onChange={onFilterChange}
                                    />
                                </Suspense>
                            </div>

                            <div className="w-3/4">
                                {/* <Suspense fallback={<div>Loading companies list...</div>}> */}
                                <Suspense
                                    fallback={
                                        <div className="grid grid-cols-3 gap-4">
                                            {Array.from({ length: 6 }).map((_, idx) => (
                                                <CompanyCardSkeleton key={idx} />
                                            ))}
                                        </div>
                                    }
                                >
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
                                </Suspense>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
