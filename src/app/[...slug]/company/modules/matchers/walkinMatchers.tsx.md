import WalkinJobsPage from '../components/WalkinJobsPage'

export const matchWalkinRoutes = (path: string, pageNo: number, _buildCompanyApiUrl: Function, buildJobApiUrl: Function) => {
    const patterns = [
        {
            regex: /walkin-(.*)-jobs-in-(.*)/,
            handler: () => ({
                url: buildJobApiUrl({ urlType: 'walkin_search', seoKey: path, pageNo }),
                component: <WalkinJobsPage />,
            }),
        },
        {
            regex: /walkin-(.*)-jobs/,
            handler: () => ({
                url: buildJobApiUrl({ urlType: 'walkin_search', seoKey: path, pageNo }),
                component: <WalkinJobsPage />,
            }),
        },
        {
            regex: /walkin-jobs-in-(.*)/,
            handler: () => ({
                url: buildJobApiUrl({ urlType: 'walkin_search', seoKey: path, pageNo }),
                component: <WalkinJobsPage />,
            }),
        },
    ]

    for (const { regex, handler } of patterns) {
        const match = path.match(regex)
        if (match) return handler(match)
    }

    return null
}
