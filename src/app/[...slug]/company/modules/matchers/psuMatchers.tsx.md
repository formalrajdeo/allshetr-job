import PsuListingPage from '../components/PsuListingPage'

export const matchPsuRoutes = (path: string, pageNo: number, _buildCompanyApiUrl: Function, buildJobApiUrl: Function) => {
    const patterns = [
        {
            regex: /psu-government-jobs-for-(.*)-in-(.*)/,
            handler: () => ({
                url: buildJobApiUrl({ urlType: 'psu_search_by_key_loc', seoKey: path, pageNo }),
                component: <PsuListingPage />,
            }),
        },
        {
            regex: /psu-government-jobs-in-(.*)/,
            handler: () => ({
                url: buildJobApiUrl({ urlType: 'psu_search_by_location', seoKey: path, pageNo }),
                component: <PsuListingPage />,
            }),
        },
        {
            regex: /psu-government-jobs-for-(.*)/,
            handler: () => ({
                url: buildJobApiUrl({ urlType: 'psu_search_by_keyword', seoKey: path, pageNo }),
                component: <PsuListingPage />,
            }),
        },
        {
            regex: /(.*)-jobs-recruitment/,
            handler: () => ({
                url: buildJobApiUrl({ urlType: 'psu_search_by_industry', seoKey: path, pageNo }),
                component: <PsuListingPage />,
            }),
        },
        {
            regex: /(.*)-recruitment-jobs-(\d+)/,
            handler: () => ({
                url: buildJobApiUrl({ urlType: 'search_by_psu_company_id', seoKey: path, pageNo }),
                component: <PsuListingPage />,
            }),
        },
    ]

    for (const { regex, handler } of patterns) {
        const match = path.match(regex)
        if (match) return handler(match)
    }

    return null
}
