import JobListingPage from '../components/JobListingPage'

export const matchJobRoutes = (path: string, pageNo: number, _buildCompanyApiUrl: Function, buildJobApiUrl: Function) => {
    const patterns = [
        {
            regex: /(.*)-jobs-careers-(\d+)/,
            handler: () => ({
                url: buildJobApiUrl({ urlType: 'search_by_company_id', seoKey: path, pageNo }),
                component: <JobListingPage />,
            }),
        },
        {
            regex: /(.*)-jobs-careers-in-(.*)-gid-(\d+)/,
            handler: () => ({
                url: buildJobApiUrl({ urlType: 'search_by_group_id', seoKey: path, pageNo }),
                component: <JobListingPage />,
            }),
        },
        {
            regex: /(.*)-group-overview-(\d+)/,
            handler: () => ({
                url: buildJobApiUrl({ urlType: 'search_by_group_id', seoKey: path, pageNo }),
                component: <JobListingPage />,
            }),
        },
        {
            regex: /(.*)-jobs-in-(.*)/,
            handler: () => ({
                url: buildJobApiUrl({ urlType: 'search_by_key_loc', seoKey: path, pageNo }),
                component: <JobListingPage />,
            }),
        },
        {
            regex: /(.*)-jobs/,
            handler: () => ({
                url: buildJobApiUrl({ urlType: 'search_by_keyword', seoKey: path, pageNo }),
                component: <JobListingPage />,
            }),
        },
    ]

    for (const { regex, handler } of patterns) {
        const match = path.match(regex)
        if (match) return handler(match)
    }

    return null
}
