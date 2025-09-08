// app/[...slug]/page.tsx

'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DynamicSearchPage() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [apiUrl, setApiUrl] = useState<string>('')

    useEffect(() => {
        if (!pathname) return

        const slugArray = pathname.replace(/^\/+|\/+$/g, '').split('/')
        const path = slugArray.join('/')
        const noOfResults = 20
        const base = 'http://localhost:3000'

        let keyword = ''
        let location = ''
        let companyId = ''
        let companyName = ''
        let groupId = ''
        let groupName = ''
        let groupLocation = ''
        let premiumTypeCategory = ''
        let industryLabel = ''
        let urlType = ''
        let searchType = ''
        let seoKey = path
        let pageNo = 1

        // const lastSegment = slugArray[slugArray.length - 1]
        // const pageMatch = lastSegment?.match(/(\d+)$/)
        // if (pageMatch && path.includes('-jobs')) {
        //     pageNo = parseInt(pageMatch[1])
        // }
        if (/.*-jobs-\d+$/.test(path)) {
            const pageMatch = path.match(/(\d+)$/)
            if (pageMatch) {
                pageNo = parseInt(pageMatch[1])
            }
        }

        const setApi = (url: string) => setApiUrl(url)

        // ===========================
        // 🔍 Pattern Matching Section
        // ===========================

        // 1. Job detail (Google jobs)
        if (/^job-listings-.*-\d+$/.test(path)) {
            const jobId = path.split('-').pop()
            return setApi(
                `1 ||||${base}/jobapi/v2/search/simjobs/${jobId}?noOfResults=${noOfResults}&searchType=sim \n
                Job details |||| ${base}/jobapi/v4/job/${jobId}?microsite=y&brandedConsultantJd=true&src=drecomm_profile&sid=17573512779539188&xp=1&px=1
                `
            )
        }

        // 2. Company by ID
        const companyIdMatch = path.match(/(.*)-jobs-careers-(\d+)/)
        if (companyIdMatch) {
            companyName = companyIdMatch[1]
            companyId = companyIdMatch[2]
            urlType = 'search_by_company_id'
            searchType = 'groupsearch'
            return setApi(
                `2 ||||${base}/jobapi/v3/search?noOfResults=${noOfResults}&urlType=${urlType}&searchType=${searchType}&companyName=${companyName}&companyId=${companyId}&pageNo=${pageNo}&seoKey=${seoKey}&src=directSearch&latLong=`
            )
        }

        // 3. Group by ID
        const groupMatch = path.match(/(.*)-jobs-careers-in-(.*)-gid-(\d+)/)
        if (groupMatch) {
            groupName = groupMatch[1]
            groupLocation = groupMatch[2]
            groupId = groupMatch[3]
            urlType = 'search_by_group_id'
            searchType = 'groupidsearch'
            return setApi(
                `3 ||||${base}/jobapi/v3/search?noOfResults=${noOfResults}&urlType=${urlType}&searchType=${searchType}&groupName=${groupName}&groupId=${groupId}&groupLocation=${groupLocation}&pageNo=${pageNo}&seoKey=${seoKey}&src=directSearch&latLong=`
            )
        }

        // 4. PSU keyword + location
        const psuKeyLoc = path.match(/psu-government-jobs-for-(.*)-in-(.*)/)
        if (psuKeyLoc) {
            keyword = psuKeyLoc[1]
            location = psuKeyLoc[2]
            urlType = 'psu_search_by_key_loc'
            searchType = 'psu'
            return setApi(
                `4 ||||${base}/jobapi/v3/search?noOfResults=${noOfResults}&urlType=${urlType}&searchType=${searchType}&keyword=${keyword}&location=${location}&pageNo=${pageNo}&seoKey=${seoKey}&src=jobsearchDesk&latLong=`
            )
        }

        // 5. PSU location
        const psuLoc = path.match(/psu-government-jobs-in-(.*)/)
        if (psuLoc) {
            location = psuLoc[1]
            urlType = 'psu_search_by_location'
            searchType = 'psu'
            return setApi(
                `5 ||||${base}/jobapi/v3/search?noOfResults=${noOfResults}&urlType=${urlType}&searchType=${searchType}&location=${location}&pageNo=${pageNo}&seoKey=${seoKey}&src=jobsearchDesk&latLong=`
            )
        }

        // 6. PSU keyword only
        const psuKey = path.match(/psu-government-jobs-for-(.*)/)
        if (psuKey) {
            keyword = psuKey[1]
            urlType = 'psu_search_by_keyword'
            searchType = 'psu'
            return setApi(
                `6 ||||${base}/jobapi/v3/search?noOfResults=${noOfResults}&urlType=${urlType}&searchType=${searchType}&keyword=${keyword}&pageNo=${pageNo}&seoKey=${seoKey}&src=jobsearchDesk&latLong=`
            )
        }

        // 7. PSU by industry
        const industryMatch = path.match(/(.*)-jobs-recruitment/)
        if (industryMatch) {
            industryLabel = industryMatch[1]
            urlType = 'psu_search_by_industry'
            searchType = 'psu'
            return setApi(
                `7 ||||${base}/jobapi/v3/search?noOfResults=${noOfResults}&urlType=${urlType}&searchType=${searchType}&industryLabel=${industryLabel}&pageNo=${pageNo}&seoKey=${seoKey}&src=jobsearchDesk&latLong=`
            )
        }

        // 8. PSU by company ID
        const psuCompanyMatch = path.match(/(.*)-recruitment-jobs-(\d+)/)
        if (psuCompanyMatch) {
            companyName = psuCompanyMatch[1]
            companyId = psuCompanyMatch[2]
            urlType = 'search_by_psu_company_id'
            searchType = 'psu'
            return setApi(
                `8 ||||${base}/jobapi/v3/search?noOfResults=${noOfResults}&urlType=${urlType}&searchType=${searchType}&companyName=${companyName}&companyId=${companyId}&pageNo=${pageNo}&seoKey=${seoKey}&src=psusearch&latLong=`
            )
        }

        // 9. Walkin jobs (keyword + location)
        const walkinKeyLoc = path.match(/walkin-(.*)-jobs-in-(.*)/)
        if (walkinKeyLoc) {
            keyword = walkinKeyLoc[1]
            location = walkinKeyLoc[2]
            urlType = 'walkin_search'
            searchType = 'walkin'
            return setApi(
                `9 ||||${base}/jobapi/v3/search?noOfResults=${noOfResults}&urlType=${urlType}&searchType=${searchType}&keyword=${keyword}&location=${location}&pageNo=${pageNo}&seoKey=${seoKey}&src=walkinSearch&latLong=`
            )
        }

        // 10. Walkin jobs (keyword only)
        const walkinKey = path.match(/walkin-(.*)-jobs/)
        if (walkinKey) {
            keyword = walkinKey[1]
            urlType = 'walkin_search'
            searchType = 'walkin'
            return setApi(
                `10 ||||${base}/jobapi/v3/search?noOfResults=${noOfResults}&urlType=${urlType}&searchType=${searchType}&keyword=${keyword}&pageNo=${pageNo}&seoKey=${seoKey}&src=walkinSearch&latLong=`
            )
        }

        // 11. Walkin jobs (location only)
        const walkinLoc = path.match(/walkin-jobs-in-(.*)/)
        if (walkinLoc) {
            location = walkinLoc[1]
            urlType = 'walkin_search'
            searchType = 'walkin'
            return setApi(
                `11 ||||${base}/jobapi/v3/search?noOfResults=${noOfResults}&urlType=${urlType}&searchType=${searchType}&location=${location}&pageNo=${pageNo}&seoKey=${seoKey}&src=walkinSearch&latLong=`
            )
        }

        // 12. Premium MBA
        const premiumMba = path.match(/premium-jobs-for-iim-mba-graduates-in-(.*)/)
        if (premiumMba) {
            premiumTypeCategory = premiumMba[1]
            urlType = 'premium_mba_search_by_category'
            searchType = 'np'
            return setApi(
                `12 ||||${base}/jobapi/v3/search?noOfResults=${noOfResults}&urlType=${urlType}&searchType=${searchType}&premiumTypeCategory=${premiumTypeCategory}&pageNo=${pageNo}&seoKey=${seoKey}&src=jobsearchDesk&latLong=`
            )
        }

        // 13. Premium Engg
        const premiumEngg = path.match(/premium-jobs-for-iit-engineering-graduates-in-(.*)/)
        if (premiumEngg) {
            premiumTypeCategory = premiumEngg[1]
            urlType = 'premium_engg_search_by_category'
            searchType = 'np'
            return setApi(
                `13 ||||${base}/jobapi/v3/search?noOfResults=${noOfResults}&urlType=${urlType}&searchType=${searchType}&premiumTypeCategory=${premiumTypeCategory}&pageNo=${pageNo}&seoKey=${seoKey}&src=jobsearchDesk&latLong=`
            )
        }

        // 14. Premium keyword + location
        const premiumKeyLoc = path.match(/premium-(.*)-jobs-in-(.*)/)
        if (premiumKeyLoc) {
            keyword = premiumKeyLoc[1]
            location = premiumKeyLoc[2]
            urlType = 'premium_search_by_key_loc'
            searchType = 'np'
            return setApi(
                `14 ||||${base}/jobapi/v3/search?noOfResults=${noOfResults}&urlType=${urlType}&searchType=${searchType}&keyword=${keyword}&location=${location}&pageNo=${pageNo}&seoKey=${seoKey}&src=jobsearchDesk&latLong=`
            )
        }

        // 15. Premium keyword only
        const premiumKey = path.match(/premium-(.*)-jobs/)
        if (premiumKey) {
            keyword = premiumKey[1]
            urlType = 'premium_search_by_keyword'
            searchType = 'np'
            return setApi(
                `15 ||||${base}/jobapi/v3/search?noOfResults=${noOfResults}&urlType=${urlType}&searchType=${searchType}&keyword=${keyword}&pageNo=${pageNo}&seoKey=${seoKey}&src=jobsearchDesk&latLong=`
            )
        }

        // 16. Premium location only
        const premiumLoc = path.match(/premium-jobs-in-(.*)/)
        if (premiumLoc) {
            location = premiumLoc[1]
            urlType = 'premium_search_by_location'
            searchType = 'np'
            return setApi(
                `16 ||||${base}/jobapi/v3/search?noOfResults=${noOfResults}&urlType=${urlType}&searchType=${searchType}&location=${location}&pageNo=${pageNo}&seoKey=${seoKey}&src=jobsearchDesk&latLong=`
            )
        }

        // 17. Generic keyword + location
        const keyLoc = path.match(/(.*)-jobs-in-(.*)/)
        if (keyLoc) {
            keyword = keyLoc[1]
            location = keyLoc[2]
            urlType = 'search_by_key_loc'
            searchType = 'adv'
            return setApi(
                `17 ||||${base}/jobapi/v3/search?noOfResults=${noOfResults}&urlType=${urlType}&searchType=${searchType}&keyword=${keyword}&location=${location}&pageNo=${pageNo}&seoKey=${seoKey}&src=jobsearchDesk&latLong=`
            )
        }

        // 18. Keyword only
        const keywordOnly = path.match(/(.*)-jobs/)
        if (keywordOnly) {
            const rawKeyword = keywordOnly[1]  // keep original (node.js)
            keyword = rawKeyword.replace(/-dot-/g, ".") // in case slug was converted

            urlType = 'search_by_keyword'
            searchType = 'adv'

            return setApi(
                `14 ||||https://www.naukri.com/jobapi/v3/search?noOfResults=${noOfResults}` +
                `&urlType=${urlType}&searchType=${searchType}` +
                `&keyword=${keyword}&sort=p&pageNo=${pageNo}&k=${keyword}` +
                `&nignbevent_src=jobsearchDeskGNB&seoKey=${seoKey}` +
                `&src=jobsearchDesk&latLong=`
            )
        }

        // 19. Group overview by ID (new case)
        const groupOverviewMatch = path.match(/(.*)-group-overview-(\d+)/)
        if (groupOverviewMatch) {
            groupName = groupOverviewMatch[1]
            groupId = groupOverviewMatch[2]
            urlType = 'search_by_group_id'
            searchType = 'groupidsearch'

            return setApi(
                `19 ||||${base}/jobapi/v3/search?noOfResults=${noOfResults}` +
                `&groupId=${groupId}&pageNo=${pageNo}` +
                `&searchType=${searchType}`
            )
        }

        // ===========================
        // ✅ Fallback generic search
        // ===========================
        setApi(
            `99 ||||${base}/jobapi/v3/search?noOfResults=${noOfResults}&searchType=adv&pageNo=1&seoKey=${seoKey}&src=jobsearchDesk`
        )
    }, [pathname, searchParams])

    return (
        <div style={{ padding: '2rem' }}>
            <h2>🔍 Generated API URL</h2>
            <pre
                style={{
                    background: '#f4f4f4',
                    padding: '1rem',
                    borderRadius: '8px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                {apiUrl || 'Loading...'}
            </pre>
        </div>
    )
}
