"use client";
import React, { useMemo, useState } from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import GlobalCompanyCategorySlider from "./GlobalCompanyCategorySlider";
import FilterSidebar from "./FilterSidebar";
import CompanyCard from "./CompanyCard";

// ---- Types ----
interface GroupTagMap {
    businessSize?: string[];
    natureofBusiness?: string[];
    ownershipType?: string[];
    [key: string]: string[] | undefined;
}

interface GroupDetails {
    groupId: number;
    groupName: string;
    groupLogo: {
        desktop: string;
        mobile?: string;
    };
    groupTags: GroupTagMap;
    noOfReviews?: number;
    rating?: number;
    industry?: string;
    location?: string;
}

interface FilterItem {
    id: string;
    label: string;
    count: number;
}

interface Cluster {
    id: string;
    label: string;
    paramKey: string;
    selectType: "multi" | "single";
    isSearchApplicable?: boolean;
    state?: string;
    type?: string;
    data: FilterItem[];
}

interface CompanySearchData {
    noOfGroups: number;
    clusters: Record<string, Cluster>;
    clusterOrder: string[];
    groupDetails: GroupDetails[];
}

// ---- Import JSON (static or from API) ----
import filtersJSON from "./data/companySearch_search_by_company_general.json";
const data = filtersJSON as unknown as CompanySearchData;

// ---- Main Component ----
export default function CompanyPage() {
    // selected slider category
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // selected filters: filterId -> array of selected values
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

    const { clusterOrder, clusters: filtersMap, groupDetails } = data;
    function onFilterChange(filterId: string, values: string[]) {
        setSelectedFilters((prev) => ({ ...prev, [filterId]: values }));
    }

    const fieldMapping: Record<string, keyof GroupTagMap | "location" | "industry"> = {
        business_size: "businessSize",
        nature_of_business: "natureofBusiness",
        ownership_type: "ownershipType",
        employer_type: "employerType",
        offering_type: "offeringType",
        primary_industry: "primaryIndustry",
        employees_count: "employeesCount",
        founding_year: "foundingYear",
        top_company: "topCompany", // optional tag
        hq: "hq", // optional tag
        // Additional non-tag filters
        companyIndustry: "industry", // if coming from external field
        allLocation: "location",     // if coming from external field
        allDept: "department",       // future use
        allExperience: "experience", // future use
        dateBucket: "dateBucket"     // future use
    };

    // ---- Filtering logic ----
    const filteredCompanies = useMemo(() => {
        let list = groupDetails.slice();
        console.log({ list })
        if (selectedCategory) {
            // For now we assume category matches industry or natureofBusiness
            list = list.filter(
                (c) =>
                    c.industry === selectedCategory ||
                    c.groupTags?.natureofBusiness?.includes(selectedCategory)
            );
        }
        console.log({ selectedCategory, selectedFilters })

        for (const filterId of Object.keys(selectedFilters)) {
            const selectedVals = selectedFilters[filterId];
            if (!selectedVals || selectedVals.length === 0) continue;

            const field = fieldMapping[filterId];
            console.log({ field, selectedVals })
            if (!field) continue;

            list = list.filter((company) => {
                if (field in (company.groupTags || {})) {
                    const tags = company.groupTags[field as keyof GroupTagMap] || [];
                    return selectedVals.some((v) => tags.includes(v));
                }
                const value = (company as any)[field];
                if (!value) return false;
                return selectedVals.includes(value);
            });
        }

        return list;
    }, [groupDetails, selectedFilters, selectedCategory]);

    return (
        <>
            <Navbar />
            <main className="flex justify-center py-10">
                <div className="w-11/12">
                    <h1 className="font-bold text-lg mb-6">Top companies hiring now</h1>

                    {/* Slider */}
                    <GlobalCompanyCategorySlider
                        data={[
                            { label: "MNCs", count: "2.1K+ Companies" },
                            { label: "Product", count: "1.2K+ Companies" },
                            { label: "Banking & Finance", count: "385 Companies" },
                            { label: "B2C", count: "2.3K+ Companies" },
                            { label: "Manufacturing", count: "961 Companies" }
                        ]}
                        options={{ itemWidth: 200, gap: 16, arrowColor: "gray-600" }}
                        renderItem={({ label, count }: any) => (
                            <div
                                onClick={() => setSelectedCategory(label)}
                                className={`min-w-[200px] p-4 border rounded-xl shadow-sm transition cursor-pointer ${selectedCategory === label ? "ring-2 ring-blue-300" : "bg-white"
                                    }`}
                            >
                                <h2 className="font-semibold mb-1">{label}</h2>
                                <p className="text-sm font-medium text-blue-600 flex items-center space-x-1">
                                    <span>{count}</span>
                                </p>
                            </div>
                        )}
                    />

                    {/* Filters + Companies */}
                    <div className="m-4 flex justify-between items-start w-11/12">
                        {/* Left: Filters */}
                        <FilterSidebar
                            clusterOrder={clusterOrder}
                            filters={filtersMap}
                            selectedFilters={selectedFilters}
                            onChange={onFilterChange}
                        />

                        {/* Right: Companies */}
                        <div className="w-full ml-6">
                            <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
                                <div>
                                    <span className="text-gray-600 text-sm">
                                        Showing {filteredCompanies.length} companies
                                        {selectedCategory ? ` in ${selectedCategory}` : ""}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4 text-sm">
                                    <button
                                        onClick={() => {
                                            setSelectedCategory(null);
                                            setSelectedFilters({});
                                        }}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Clear All Filters
                                    </button>
                                    <span className="text-gray-500">Sort / View controls (optional)</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {filteredCompanies.map((c) => (
                                    <CompanyCard key={c.groupId} company={c} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
