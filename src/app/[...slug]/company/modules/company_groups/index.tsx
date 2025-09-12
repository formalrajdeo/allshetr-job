"use client";
import React, { useEffect, useMemo, useState } from "react";
import CompanyCategorySlider from "./CompanyCategorySlider";
import FilterSidebar from "./FilterSidebar";
import { CompanySearchData, GroupTagMap } from "@/app/types";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import CompanyGroups from "./CompanyGroups";
import filtersJSON from "../../data/companySearch_search_by_company_general.json";

const companyData = filtersJSON as unknown as CompanySearchData;

// ---- Main Component ----
export default function CompanyPage() {
    const ITEMS_PER_PAGE = 48;
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

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

        //  Apply selected filters from UI (e.g., checkboxes)
        for (const filterId of Object.keys(selectedFilters)) {
            const selectedVals = selectedFilters[filterId];
            if (!selectedVals || selectedVals.length === 0) continue;

            const field = fieldMapping[filterId];

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

    // const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
    // const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    // const paginatedCompanies = filteredCompanies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    useEffect(() => {
        setCurrentPage(1);
        console.log({ selectedFilters })
    }, [selectedCategory, selectedFilters]);

    return (
        <>
            <Navbar />
            <main className="flex justify-center py-10">
                <div className="w-11/12">
                    <h1 className="font-bold text-lg mb-6">Top companies hiring now</h1>
                    <CompanyCategorySlider
                        setSelectedCategory={setSelectedCategory}
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
                        <CompanyGroups
                            filteredCompanies={filteredCompanies}
                            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            setSelectedFilters={setSelectedFilters}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
