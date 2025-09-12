import { buildCompanyApiUrl } from '../../common'
import CompanyPage from '../company_groups'

export const matchCompanyRoutes = (path: string, pageNo: number) => {
    const patterns = [
        {
            regex: /^companies-in-(.*)-l(\d+)$/,
            handler: (m: RegExpMatchArray) => ({
                url: buildCompanyApiUrl(path, 'search_by_loc', { qcallJobLocation: m[2] }, pageNo),
                component: <CompanyPage />,
            }),
        },
        {
            regex: /^companies-in-india-l(\d+)$/,
            handler: (m: RegExpMatchArray) => ({
                url: buildCompanyApiUrl(path, 'search_by_loc', { qcallJobLocation: m[1] }, pageNo),
                component: <CompanyPage />,
            }),
        },
        {
            regex: /^(.*)-companies-in-india-ind(\d+)$/,
            handler: (m: RegExpMatchArray) => ({
                url: buildCompanyApiUrl(path, 'search_by_industry_id', { qccompanyIndustry: m[2] }, pageNo),
                component: <CompanyPage />,
            }),
        },
        {
            regex: /^(.*)-companies-in-(.*)-ind(\d+)l(\d+)$/,
            handler: (m: RegExpMatchArray) => ({
                url: buildCompanyApiUrl(path, 'search_by_industry_loc', {
                    qccompanyIndustry: m[3],
                    locationId: m[4],
                    type: m[1],
                    location: m[2],
                }, pageNo),
                component: <CompanyPage />,
            }),
        },
        {
            regex: /^(.*)-companies-in-india-bs(\d+)$/,
            handler: (m: RegExpMatchArray) => ({
                url: buildCompanyApiUrl(path, 'search_by_company_type_id', { qcbusinessSize: m[2] }, pageNo),
                component: <CompanyPage />,
            }),
        },
        {
            regex: /^(.*)-companies-in-(.*)-bs(\d+)l(\d+)$/,
            handler: (m: RegExpMatchArray) => ({
                url: buildCompanyApiUrl(path, 'search_by_company_type_loc', {
                    qcbusinessSize: m[3],
                    locationId: m[4],
                    type: m[1],
                    location: m[2],
                }, pageNo),
                component: <CompanyPage />,
            }),
        },
        {
            regex: /^(.*)-companies-in-india-cat(\d+)$/,
            handler: (m: RegExpMatchArray) => ({
                url: buildCompanyApiUrl(path, 'search_by_category_id', { categoryId: m[2], type: m[1] }, pageNo),
                component: <CompanyPage />,
            }),
        },
        {
            regex: /^(.*)-companies-in-(.*)-cat(\d+)l(\d+)$/,
            handler: (m: RegExpMatchArray) => ({
                url: buildCompanyApiUrl(path, 'search_by_category_loc', {
                    categoryId: m[3],
                    locationId: m[4],
                    type: m[1],
                    location: m[2],
                }, pageNo),
                component: <CompanyPage />,
            }),
        },
    ]

    for (const { regex, handler } of patterns) {
        const match = path.match(regex)
        if (match) return handler(match)
    }

    return null
}
