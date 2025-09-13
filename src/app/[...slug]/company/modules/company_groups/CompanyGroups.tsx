"use client";

import React, { useState } from "react";
import CompanyCard from "./CompanyCard";

type Props = {
    totalRecordsInDB: any;
    filteredCompanies: any;
    ITEMS_PER_PAGE: any;
    currentPage: any;
    setCurrentPage: any;
    selectedCategory: any;
    setSelectedCategory: any;
    setSelectedFilters: any
};

const generatePageNumbers = ({ totalPages, currentPage }: any) => {
    const totalPageNumbersToShow = 10;
    const pages = [];

    if (totalPages <= totalPageNumbersToShow) {
        // Show all pages
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        const leftSiblingIndex = Math.max(currentPage - 2, 1);
        const rightSiblingIndex = Math.min(currentPage + 2, totalPages);

        const showLeftEllipsis = leftSiblingIndex > 2;
        const showRightEllipsis = rightSiblingIndex < totalPages - 1;

        if (!showLeftEllipsis && showRightEllipsis) {
            // Only right ellipsis
            for (let i = 1; i <= 5; i++) pages.push(i);
            pages.push("...");
            pages.push(totalPages);
        } else if (showLeftEllipsis && !showRightEllipsis) {
            // Only left ellipsis
            pages.push(1);
            pages.push("...");
            for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
        } else {
            // Both ellipses
            pages.push(1);
            pages.push("...");
            for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
            pages.push("...");
            pages.push(totalPages);
        }
    }

    return pages;
};

const CompanyGroups = ({ totalRecordsInDB, filteredCompanies, ITEMS_PER_PAGE, currentPage, setCurrentPage, selectedCategory, setSelectedCategory, setSelectedFilters }: Props) => {
    const totalPages = Math.ceil(totalRecordsInDB / ITEMS_PER_PAGE);
    const startIndex = 0;
    const paginatedCompanies = filteredCompanies?.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    return (
        <div className="w-full ml-6">
            {/* Header with filters */}
            <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                    <span className="text-gray-600 text-sm">
                        Showing {totalRecordsInDB} companies
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

            {/* Companies grid */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedCompanies?.map((c: any) => (
                    <CompanyCard key={c.groupId} company={c} />
                ))}
            </div> */}
            {filteredCompanies.length === 0 ? (
                <p className="text-gray-500 mt-4">No companies found for selected filters.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paginatedCompanies?.map((c: any) => (
                        <CompanyCard key={c.groupId} company={c} />
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="mt-6 flex flex-col md:flex-row items-center justify-center mb-60 gap-4">
                <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                </span>

                <div className="flex items-center gap-2 text-sm">
                    <button
                        onClick={() => setCurrentPage((prev: any) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 border rounded ${currentPage === 1
                            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                            : "text-gray-700 bg-white hover:bg-gray-50"
                            }`}
                    >
                        ← Previous
                    </button>

                    {generatePageNumbers({ totalPages, currentPage }).map((page, index) =>
                        page === "..." ? (
                            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                                ...
                            </span>
                        ) : (
                            <button
                                key={`page-${page}`}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 rounded-full border ${currentPage === page
                                    ? "bg-white border-gray-700 text-gray-900 font-semibold"
                                    : "bg-transparent border-transparent text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                {page}
                            </button>
                        )
                    )}

                    <button
                        onClick={() =>
                            setCurrentPage((prev: any) => Math.min(prev + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 border rounded ${currentPage === totalPages
                            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                            : "text-gray-700 bg-white hover:bg-gray-50"
                            }`}
                    >
                        Next →
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CompanyGroups;
