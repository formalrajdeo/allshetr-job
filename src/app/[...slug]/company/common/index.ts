const base = process.env.NEXT_PUBLIC_UI_PORT;
const noOfResults = 20;

export const buildCompanyApiUrl = (path: string, urltype: string, extra: Record<string, string | number | undefined>, pageNo = 1) => {
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

export const buildJobApiUrl = (opts: { urlType?: string; seoKey?: string; pageNo?: number; noOfResults?: number; src?: string }) => {
    const u = opts.urlType ?? 'search_by_keyword'
    const sk = opts.seoKey ?? ''
    const pn = opts.pageNo ?? 1
    const nr = opts.noOfResults ?? noOfResults
    const s = opts.src ?? 'jobsearchDesk'
    return `${base}/jobapi/v3/search?noOfResults=${nr}&urlType=${encodeURIComponent(u)}&pageNo=${pn}&seoKey=${encodeURIComponent(sk)}&src=${encodeURIComponent(s)}`
}

export const buildQueryParams = (
    filters: Record<string, string[]>,
    fieldMapping: Record<string, string>
): URLSearchParams => {
    const params = new URLSearchParams();

    for (const key in filters) {
        const values = filters[key];
        if (!values || values.length === 0) continue;

        const mappedKey = fieldMapping[key];
        if (!mappedKey) continue;

        values.forEach((val) => {
            params.append(`qc${mappedKey}`, val);
        });
    }

    return params;
}