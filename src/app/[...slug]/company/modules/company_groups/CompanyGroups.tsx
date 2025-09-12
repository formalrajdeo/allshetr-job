import CompanyCard from "./CompanyCard";

const CompanyGroups = ({ filteredCompanies, ITEMS_PER_PAGE, currentPage, setCurrentPage, selectedCategory, setSelectedCategory, setSelectedFilters }: any) => {

    const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedCompanies = filteredCompanies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (<div className="w-full ml-6">
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

        <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedCompanies.map((c: any) => (
                    <CompanyCard key={c.groupId} company={c} />
                ))}
            </div>
            {/* Pagination Controls */}
            <div className="mt-6 flex flex-col md:flex-row items-center justify-center mb-60 gap-4">
                {/* Page info */}
                <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                </span>

                {/* Full pagination UI */}
                <div className="flex items-center gap-2 text-sm">
                    {/* Previous Button */}
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

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded-full border ${currentPage === page
                                ? "bg-white border-gray-700 text-gray-900 font-semibold"
                                : "bg-transparent border-transparent text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    {/* Next Button */}
                    <button
                        onClick={() => setCurrentPage((prev: any) => Math.min(prev + 1, totalPages))}
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
    </div>);
}

export default CompanyGroups;