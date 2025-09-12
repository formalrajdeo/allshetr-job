'use client'
import * as React from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { matchRoute } from './company/modules/matchers'

export default function DynamicSearchPage() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [apiUrl, setApiUrl] = useState<string>('')
    const [component, setComponent] = useState<React.ReactElement | null>(null)

    const base = process.env.NEXT_PUBLIC_UI_PORT;
    const noOfResults = 20

    const buildCompanyApiUrl = (path: string, urltype: string, extra: Record<string, string | number | undefined>, pageNo = 1) => {
        const seoKeyRaw = `/${path}`
        let url = `${base}/companyapi/v1/search?seoKey=${seoKeyRaw}&urltype=${encodeURIComponent(urltype)}`

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
        const pageMatch = path.match(/-jobs-(\d+)$/)
        if (pageMatch) pageNo = parseInt(pageMatch[1], 10)

        const result = matchRoute(path, pageNo, buildCompanyApiUrl, buildJobApiUrl)

        if (result) {
            setApiUrl(result.url)
            setComponent(result.component)
        } else {
            const fallbackUrl = buildJobApiUrl({ seoKey: path, pageNo })
            setApiUrl(fallbackUrl)
            setComponent(<div>Fallback check first from DB found good else 404 page!!!</div>)
        }        
    }, [pathname, searchParams])

    return <>{component}</>
}
