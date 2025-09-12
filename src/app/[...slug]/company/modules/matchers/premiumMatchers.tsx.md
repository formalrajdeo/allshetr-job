import PremiumJobsPage from '../components/PremiumJobsPage'

export const matchPremiumRoutes = (path: string, pageNo: number, _buildCompanyApiUrl: Function, buildJobApiUrl: Function) => {
    const patterns = [
        {
            regex: /premium-jobs-for-iim-mba-graduates-in-(.*)/,
            handler: () => ({
                url: buildJobApiUrl({ urlType: 'premium_mba_search_by_category', seoKey: path, pageNo }),
                component: <PremiumJobsPage />,
            }),
        },
        {
            regex: /premium-jobs-for-iit-engineering-graduates-in-(.*)/,
            handler: () => ({
                url: buildJobApiUrl({ urlType: 'premium_engg_search_by_category', seoKey: path, pageNo }),
                component: <PremiumJobsPage />,
            }),
        },
        {
            regex: /premium-(.*)-jobs-in-(.*)/,
            handler: () => ({
                url: buildJobApiUrl({ urlType: 'premium_search_by_key_loc', seoKey: path, pageNo }),
                component: <PremiumJobsPage />,
            }),
        },
        {
            regex: /premium-(.*)-jobs/,
            handler: () => ({
                url: buildJobApiUrl({ urlType: 'premium_search_by_keyword', seoKey: path, pageNo }),
                component: <PremiumJobsPage />,
            }),
        },
        {
            regex: /premium-jobs-in-(.*)/,
            handler: () => ({
                url: buildJobApiUrl({ urlType: 'premium_search_by_location', seoKey: path, pageNo }),
                component: <PremiumJobsPage />,
            }),
        },
    ]

    for (const { regex, handler } of patterns) {
        const match = path.match(regex)
        if (match) return handler(match)
    }

    return null
}
