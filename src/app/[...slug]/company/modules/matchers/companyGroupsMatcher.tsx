import { buildCompanyApiUrl } from '../../common'
import CompanyPage from '../company_groups'

const staticCompanyPages = [
    'naukri-engineers-week-partner-companies',
    'allcompanies',
    'companies-hiring-in-india',
]

export const matchCompanyGroupsMatcher = (path: string, pageNo: number) => {
    if (staticCompanyPages.includes(path)) {
        const url = buildCompanyApiUrl(path, 'search_by_company_general', {}, pageNo)
        return {
            url,
            component: <CompanyPage />,
        }
    }

    return null
}
