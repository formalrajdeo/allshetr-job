"use client";
import React, { useMemo, useState } from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import GlobalCompanyCategorySlider from "./GlobalCompanyCategorySlider";
import FilterSidebar from "./FilterSidebar";
import CompanyCard from "./CompanyCard";
import { FaAngleRight } from "../icons";
import { CompanySearchData, GlobalCompanyCategoriesData, GroupTagMap } from "@/app/types";
import filtersJSON from "./data/companySearch_search_by_company_general.json";

const companyData = filtersJSON as unknown as CompanySearchData;

const globalCompanyCategoriesData: GlobalCompanyCategoriesData[] = [
    { id: 101, label: "MNCs", value: "Foreign MNC", count: "144 companies" },
    { id: 102, label: "Unicorns", value: "Unicorn", count: "144 companies" },
    { id: 103, label: "Startups", value: "Startup", count: "144 companies" },
    { id: 104, label: "B2C", value: "B2C", count: "144 companies" },
    { id: 105, label: "Internet", value: "Internet", count: "144 companies" },
    { id: 106, label: "Product", value: "Product", count: "144 companies" },
    { id: 107, label: "Edtech", value: "Edtech", count: "144 companies" },
    { id: 108, label: "Fintech", value: "Fintech", count: "144 companies" },
    { id: 110, label: "Banking & Finance", value: "Banking", count: "144 companies" },
    { id: 111, label: "Healthcare", value: "Medical Services / Hospital", count: "144 companies" },
    { id: 112, label: "Manufacturing", value: "Manufacturing", count: "144 companies" },
    { id: 113, label: "FMCG & Retail", value: "FMCG", count: "144 companies" },
    { id: 114, label: "Hospitality", value: "Hospitality", count: "144 companies" },
    { id: 115, label: "Fortune 500", value: "Fortune 500", count: "144 companies" }
];

// ---- Main Component ----
export default function CompanyPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // selected filters: filterId -> array of selected values
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

    const { clusterOrder, clusters: filtersMap, groupDetails } = companyData;
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

    const filteredCompanies = useMemo(() => {
        let list = groupDetails.slice();
        console.log({ list });

        //  Dynamically match selectedCategory across all groupTags values
        if (selectedCategory) {
            const normalizedCategory = selectedCategory.toLowerCase();

            list = list.filter((company) => {
                const tags = company.groupTags;

                if (!tags || typeof tags !== 'object') return false;

                const allTagValues: string[] = Object.values(tags)
                    .flat()
                    .filter((val): val is string => typeof val === 'string') // Narrow to string only
                    .map((val) => val.toLowerCase());

                return allTagValues.some((val) =>
                    val.includes(normalizedCategory)
                );
            });
        }

        console.log({ selectedCategory, selectedFilters });

        //  Apply selected filters from UI (e.g., checkboxes)
        for (const filterId of Object.keys(selectedFilters)) {
            const selectedVals = selectedFilters[filterId];
            if (!selectedVals || selectedVals.length === 0) continue;

            const field = fieldMapping[filterId];
            console.log({ field, selectedVals });

            if (!field) continue;

            list = list.filter((company) => {
                const tags = company.groupTags || {};

                if (field in tags) {
                    const tagValues = tags[field] || [];
                    return selectedVals.some((val) => tagValues.includes(val));
                }

                // Handle root-level fields (outside groupTags)
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
                    <GlobalCompanyCategorySlider
                        data={globalCompanyCategoriesData}
                        options={{
                            showScrollbar: false,
                            arrowColor: "gray-600",
                            itemWidth: 200, // matches your `min-w-[200px]`
                            gap: 16, // matches `gap-4`
                        }}
                        renderItem={({ label, value, count }) => (
                            <div
                                onClick={() => setSelectedCategory(value)}
                                className="min-w-[200px] p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
                                <h2 className="font-semibold mb-1">{label}</h2>
                                <p className="text-sm font-medium text-blue-600 flex items-center space-x-1">
                                    <span>{count}</span>
                                    <FaAngleRight />
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
