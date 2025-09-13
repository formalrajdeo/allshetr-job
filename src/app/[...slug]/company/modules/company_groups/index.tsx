'use client';
import React, {
    useState,
    useEffect,
    Suspense,
    lazy,
    useMemo,
} from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GroupTagMap } from '@/app/types';
import Footer from '@/app/components/footer';
import Navbar from '@/app/components/navbar';

const CompanyCategorySlider = lazy(() => import('./CompanyCategorySlider'));
const FilterSidebar = lazy(() => import('./FilterSidebar'));
const CompanyGroups = lazy(() => import('./CompanyGroups'));

const ITEMS_PER_PAGE = 48;

const fieldMapping: Record<string, keyof GroupTagMap | 'location' | 'industry'> = {
    business_size: 'businessSize',
    nature_of_business: 'natureofBusiness',
    ownership_type: 'ownershipType',
    employer_type: 'employerType',
    offering_type: 'offeringType',
    primary_industry: 'primaryIndustry',
    employees_count: 'employeesCount',
    founding_year: 'foundingYear',
    top_company: 'topCompany',
    hq: 'hq',
    companyIndustry: 'companyIndustry',
    allLocation: 'allLocation',
    allDept: 'allDept',
    allExperience: 'allExperience',
    dateBucket: 'dateBucket',
};

function buildQueryParams(
    filters: Record<string, string[]>,
    fieldMap: typeof fieldMapping
): URLSearchParams {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, values]) => {
        const mappedKey = fieldMap[key];
        if (!mappedKey) return;
        const paramKey = `qc${mappedKey}`;

        values.forEach((v) => {
            params.append(paramKey, v);
        });
    });

    return params;
}

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
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

    // Read filters from URL on load
    useEffect(() => {
        const search = new URLSearchParams(window.location.search);
        const filterObj: Record<string, string[]> = {};

        for (const [key, value] of search.entries()) {
            if (key.startsWith('qc')) {
                const originalKey = Object.entries(fieldMapping).find(
                    ([, mapped]) => `qc${mapped}` === key
                )?.[0];

                if (originalKey) {
                    if (!filterObj[originalKey]) filterObj[originalKey] = [];
                    filterObj[originalKey].push(value);
                }
            }
        }

        if (Object.keys(filterObj).length > 0) {
            setSelectedFilters(filterObj);
        }

        const pageNo = search.get('pageNo');
        if (pageNo) setCurrentPage(parseInt(pageNo, 10));
    }, []);

    // Update URL when filters or page changes
    useEffect(() => {
        const params = buildQueryParams(selectedFilters, fieldMapping);
        params.set('pageNo', String(currentPage));

        const url = `${pathname}?${params.toString()}`;

        router.push(url); // ✅ App Router compatible
    }, [selectedFilters, currentPage]);

    const {
        data: res,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['companies', currentPage, selectedFilters],
        queryFn: async () => {
            const params = buildQueryParams(selectedFilters, fieldMapping);
            params.set('seoKey', '/companies-hiring-in-india');
            params.set('urltype', 'search_by_company_general');
            params.set('pageNo', String(currentPage));
            params.set('qcount', String(ITEMS_PER_PAGE));
            params.set('searchType', 'companySearch');

            const response = await axios.get('http://localhost:5000/api/v1/company/search', {
                params,
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer <your_token_here>',
                },
            });

            return response.data.data;
        },
    });

    const totalRecordsInDB = res?.noOfGroups || 0;

    const filteredCompanies = useMemo(() => {
        if (!res?.groupDetails) return [];

        let list = [...res.groupDetails];
        console.log({ selectedFilters, list })

        if (selectedCategory) {
            const normalized = selectedCategory.toLowerCase();
            list = list.filter((company: any) => {
                const tags = company.groupTags;
                if (!tags || typeof tags !== 'object') return false;

                const allTagValues = Object.values(tags)
                    .flat()
                    .filter((val): val is string => typeof val === 'string')
                    .map((val) => val.toLowerCase());

                return allTagValues.some((val) => val.includes(normalized));
            });
        }

        /*
        for (const filterId of Object.keys(selectedFilters)) {
            const selectedVals = selectedFilters[filterId];
            console.log({ filterId, selectedVals })
            if (!selectedVals || selectedVals.length === 0) continue;

            const field = fieldMapping[filterId];
            if (!field) continue;

            list = list.filter((company: any) => {
                const tags = company.groupTags || {};

                if (field in tags) {
                    const tagValues = (tags[field] || []) as string[];
                    return selectedVals.some((val) =>
                        tagValues.map((v) => v.toLowerCase()).includes(val.toLowerCase())
                    );
                }

                const value = (company as any)[field];
                if (!value) return false;

                return selectedVals.some((val) => value.toLowerCase() === val.toLowerCase());
            });
        }
        */
        console.log({ list })
        return list;
    }, [res, selectedCategory, selectedFilters]); // ✅ Memoize based on these


    function onFilterChange(filterId: string, values: string[]) {
        setSelectedFilters((prev) => ({ ...prev, [filterId]: values }));
    }

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