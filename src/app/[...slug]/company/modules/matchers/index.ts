import React from 'react';
import { matchCompanyRoutes } from './companyMatchers'
import { matchCompanyGroupsMatcher } from './companyGroupsMatcher'
// import { matchJobRoutes } from './jobMatchers'
// import { matchPsuRoutes } from './psuMatchers'
// import { matchPremiumRoutes } from './premiumMatchers'
// import { matchWalkinRoutes } from './walkinMatchers'

export const matchRoute = (
    path: string,
    pageNo: number
): { url: string; component: React.ReactElement } | null => {
    const matchers = [
        matchCompanyRoutes,
        matchCompanyGroupsMatcher,
        // matchJobRoutes,
        // matchPsuRoutes,
        // matchPremiumRoutes,
        // matchWalkinRoutes,
    ]

    for (const matcher of matchers) {
        const result = matcher(path, pageNo)
        if (result) return result
    }

    return null
}
