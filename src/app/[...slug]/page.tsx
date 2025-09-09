// app/[...slug]/page.tsx
'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Company from '../components/company'

export default function DynamicSearchPage() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [apiUrl, setApiUrl] = useState<string>('')

    // small helpers
    const base = 'http://localhost:3000'
    const noOfResults = 20

    const buildCompanyApiUrl = (path: string, urltype: string, extra: Record<string, string | number | undefined>, pageNo = 1) => {
        // Build query in the exact order your backend expects:
        // seoKey (with leading slash, NOT encoded), urltype, specific extra params, pageNo, qcount, searchType
        const seoKeyRaw = `/${path}` // keep leading slash unencoded (matches your examples)
        let url = `${base}/companyapi/v1/search?seoKey=${seoKeyRaw}&urltype=${encodeURIComponent(urltype)}`

        // append known extras in preferred order
        if (extra.qcallJobLocation) url += `&qcallJobLocation=${encodeURIComponent(String(extra.qcallJobLocation))}`
        if (extra.qccompanyIndustry) url += `&qccompanyIndustry=${encodeURIComponent(String(extra.qccompanyIndustry))}`
        if (extra.qcbusinessSize) url += `&qcbusinessSize=${encodeURIComponent(String(extra.qcbusinessSize))}`
        if (extra.categoryId) url += `&categoryId=${encodeURIComponent(String(extra.categoryId))}`
        if (extra.location) url += `&location=${encodeURIComponent(String(extra.location))}`
        if (extra.type) url += `&type=${encodeURIComponent(String(extra.type))}`

        url += `&pageNo=${pageNo}&qcount=48&searchType=companySearch`
        return url
    }

    const buildJobApiUrl = (opts: { urlType?: string; seoKey?: string; pageNo?: number; noOfResults?: number; src?: string }) => {
        const u = opts.urlType ?? 'search_by_keyword'
        const sk = opts.seoKey ?? ''
        const pn = opts.pageNo ?? 1
        const nr = opts.noOfResults ?? noOfResults
        const s = opts.src ?? 'jobsearchDesk'
        return `${base}/jobapi/v3/search?noOfResults=${nr}&urlType=${encodeURIComponent(u)}&pageNo=${pn}&seoKey=${encodeURIComponent(sk)}&src=${encodeURIComponent(s)}`
    }

    useEffect(() => {
        if (!pathname) return

        const slugArray = pathname.replace(/^\/+|\/+$/g, '').split('/')
        const path = slugArray.join('/')
        let pageNo = 1

        // detect pagination like "-jobs-2"
        if (/.*-jobs-\d+$/.test(path)) {
            const pageMatch = path.match(/(\d+)$/)
            if (pageMatch) pageNo = parseInt(pageMatch[1], 10)
        }

        // quick setter
        const setApi = (url: string) => setApiUrl(url)

        //
        // ===== COMPANY ROUTES — handle these FIRST so they don't fall through to job routes =====
        //

        // companies-in-<location>-l<id>  e.g. companies-in-bengaluru-l97
        {
            const m = path.match(/^companies-in-(.*)-l(\d+)$/)
            if (m) {
                // const location = m[1]
                const locationId = m[2]
                const url = buildCompanyApiUrl(path, 'search_by_loc', { qcallJobLocation: locationId }, pageNo)
                return setApi(url)
            }
        }

        // companies-in-india-l<id>  e.g. companies-in-india-l123
        {
            const m = path.match(/^companies-in-india-l(\d+)$/)
            if (m) {
                const locationId = m[1]
                const url = buildCompanyApiUrl(path, 'search_by_loc', { qcallJobLocation: locationId }, pageNo)
                return setApi(url)
            }
        }

        // <type>-companies-in-india-ind<industryId>  e.g. software-product-companies-in-india-ind110
        {
            const m = path.match(/^(.*)-companies-in-india-ind(\d+)$/)
            if (m) {
                // const type = m[1]
                const industryId = m[2]
                const url = buildCompanyApiUrl(path, 'search_by_industry_id', { qccompanyIndustry: industryId }, pageNo)
                return setApi(url)
            }
        }

        // <type>-companies-in-<location>-ind<industryId>l<locationId>
        // e.g. software-companies-in-mumbai-ind123l456
        {
            const m = path.match(/^(.*)-companies-in-(.*)-ind(\d+)l(\d+)$/)
            if (m) {
                const type = m[1]
                const location = m[2]
                const industryId = m[3]
                const locationId = m[4]
                const url = buildCompanyApiUrl(path, 'search_by_industry_loc', { qccompanyIndustry: industryId, locationId, type, location }, pageNo)
                return setApi(url)
            }
        }

        // <type>-companies-in-india-bs<businessSize> e.g. corporate-companies-in-india-bs211
        {
            const m = path.match(/^(.*)-companies-in-india-bs(\d+)$/)
            if (m) {
                // const type = m[1]
                const businessSize = m[2]
                const url = buildCompanyApiUrl(path, 'search_by_company_type_id', { qcbusinessSize: businessSize }, pageNo)
                return setApi(url)
            }
        }

        // <type>-companies-in-<location>-bs<businessSize>l<locationId>
        {
            const m = path.match(/^(.*)-companies-in-(.*)-bs(\d+)l(\d+)$/)
            if (m) {
                const type = m[1]
                const location = m[2]
                const businessSize = m[3]
                const locationId = m[4]
                const url = buildCompanyApiUrl(path, 'search_by_company_type_loc', { qcbusinessSize: businessSize, locationId, type, location }, pageNo)
                return setApi(url)
            }
        }

        // category id variants
        {
            const m = path.match(/^(.*)-companies-in-india-cat(\d+)$/)
            if (m) {
                const type = m[1]
                const categoryId = m[2]
                const url = buildCompanyApiUrl(path, 'search_by_category_id', { categoryId, type }, pageNo)
                return setApi(url)
            }
        }

        {
            const m = path.match(/^(.*)-companies-in-(.*)-cat(\d+)l(\d+)$/)
            if (m) {
                const type = m[1]
                const location = m[2]
                const categoryId = m[3]
                const locationId = m[4]
                const url = buildCompanyApiUrl(path, 'search_by_category_loc', { categoryId, locationId, type, location }, pageNo)
                return setApi(url)
            }
        }

        // common static company pages
        if (path === 'naukri-engineers-week-partner-companies' || path === 'allcompanies' || path === 'companies-hiring-in-india') {
            const url = buildCompanyApiUrl(path, 'search_by_company_general', {}, pageNo)
            return setApi(url)
        }

        //
        // ===== JOB / PSU / PREMIUM / WALKIN ROUTES (existing logic) =====
        //

        // Job detail (Google/jobs)
        if (/^job-listings-.*-\d+$/.test(path)) {
            const jobId = path.split('-').pop()
            return setApi(
                `1 ||||${base}/jobapi/v2/search/simjobs/${jobId}?noOfResults=${noOfResults}&searchType=sim \n
                Job details |||| ${base}/jobapi/v4/job/${jobId}?microsite=y&brandedConsultantJd=true&src=drecomm_profile`
            )
        }

        // Company by ID (job-facing)
        {
            const m = path.match(/(.*)-jobs-careers-(\d+)/)
            if (m) {
                const companyName = m[1]
                const companyId = m[2]
                return setApi(buildJobApiUrl({ urlType: 'search_by_company_id', seoKey: path, pageNo }))
            }
        }

        // Group by ID
        {
            const m = path.match(/(.*)-jobs-careers-in-(.*)-gid-(\d+)/)
            if (m) {
                return setApi(buildJobApiUrl({ urlType: 'search_by_group_id', seoKey: path, pageNo }))
            }
        }

        // PSU keyword + location
        {
            const m = path.match(/psu-government-jobs-for-(.*)-in-(.*)/)
            if (m) {
                return setApi(buildJobApiUrl({ urlType: 'psu_search_by_key_loc', seoKey: path, pageNo }))
            }
        }

        // PSU location
        {
            const m = path.match(/psu-government-jobs-in-(.*)/)
            if (m) {
                return setApi(buildJobApiUrl({ urlType: 'psu_search_by_location', seoKey: path, pageNo }))
            }
        }

        // PSU keyword only
        {
            const m = path.match(/psu-government-jobs-for-(.*)/)
            if (m) {
                return setApi(buildJobApiUrl({ urlType: 'psu_search_by_keyword', seoKey: path, pageNo }))
            }
        }

        // PSU by industry
        {
            const m = path.match(/(.*)-jobs-recruitment/)
            if (m) {
                return setApi(buildJobApiUrl({ urlType: 'psu_search_by_industry', seoKey: path, pageNo }))
            }
        }

        // PSU by company ID
        {
            const m = path.match(/(.*)-recruitment-jobs-(\d+)/)
            if (m) {
                return setApi(buildJobApiUrl({ urlType: 'search_by_psu_company_id', seoKey: path, pageNo }))
            }
        }

        // Walkin (k + loc)
        {
            const m = path.match(/walkin-(.*)-jobs-in-(.*)/)
            if (m) return setApi(buildJobApiUrl({ urlType: 'walkin_search', seoKey: path, pageNo }))
        }
        // Walkin k only
        {
            const m = path.match(/walkin-(.*)-jobs/)
            if (m) return setApi(buildJobApiUrl({ urlType: 'walkin_search', seoKey: path, pageNo }))
        }
        // Walkin loc only
        {
            const m = path.match(/walkin-jobs-in-(.*)/)
            if (m) return setApi(buildJobApiUrl({ urlType: 'walkin_search', seoKey: path, pageNo }))
        }

        // Premium MBA/Engg and premium patterns
        {
            const m = path.match(/premium-jobs-for-iim-mba-graduates-in-(.*)/)
            if (m) return setApi(buildJobApiUrl({ urlType: 'premium_mba_search_by_category', seoKey: path, pageNo }))
        }
        {
            const m = path.match(/premium-jobs-for-iit-engineering-graduates-in-(.*)/)
            if (m) return setApi(buildJobApiUrl({ urlType: 'premium_engg_search_by_category', seoKey: path, pageNo }))
        }
        {
            const m = path.match(/premium-(.*)-jobs-in-(.*)/)
            if (m) return setApi(buildJobApiUrl({ urlType: 'premium_search_by_key_loc', seoKey: path, pageNo }))
        }
        {
            const m = path.match(/premium-(.*)-jobs/)
            if (m) return setApi(buildJobApiUrl({ urlType: 'premium_search_by_keyword', seoKey: path, pageNo }))
        }
        {
            const m = path.match(/premium-jobs-in-(.*)/)
            if (m) return setApi(buildJobApiUrl({ urlType: 'premium_search_by_location', seoKey: path, pageNo }))
        }

        // Generic keyword + location
        {
            const m = path.match(/(.*)-jobs-in-(.*)/)
            if (m) return setApi(buildJobApiUrl({ urlType: 'search_by_key_loc', seoKey: path, pageNo }))
        }

        // Keyword only
        {
            const m = path.match(/(.*)-jobs/)
            if (m) {
                // un-dot conversion
                const rawKeyword = m[1]
                const keyword = rawKeyword.replace(/-dot-/g, '.')
                return setApi(buildJobApiUrl({ urlType: 'search_by_keyword', seoKey: path, pageNo }))
            }
        }

        // Group overview (new)
        {
            const m = path.match(/(.*)-group-overview-(\d+)/)
            if (m) return setApi(buildJobApiUrl({ urlType: 'search_by_group_id', seoKey: path, pageNo }))
        }

        // fallback (generic job search)
        setApi(buildJobApiUrl({ seoKey: path, pageNo: 1, urlType: 'search_by_keyword' }))
    }, [pathname, searchParams])

    return (
        // <div style={{ padding: '2rem' }}>
        //     <h2>🔍 Generated API URL</h2>
        //     <pre
        //         style={{
        //             background: '#f4f4f4',
        //             padding: '1rem',
        //             borderRadius: '8px',
        //             whiteSpace: 'pre-wrap',
        //         }}
        //     >
        //         {apiUrl || 'Loading...'}
        //     </pre>
        // </div>
        <>
            <Company />
        </>
    )
}
