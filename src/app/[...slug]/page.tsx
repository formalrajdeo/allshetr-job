// app/[...slug]/page.tsx

interface PageProps {
    params: { slug?: string[] };
    searchParams?: { [key: string]: string };
}

const Page = async ({ params }: PageProps) => {
    const slug = params.slug?.join('/') || '';

    let apiUrl = '';

    // 1. Google specific job detail
    if (slug.startsWith('job-listings-')) {
        const parts = slug.split('-');
        const jobId = parts[parts.length - 1];
        apiUrl = `http://localhost:3000/jobapi/v2/search/simjobs/${jobId}?noOfResults=6&searchType=sim`;
    }
    // 2. Google single company (slug ends with company ID)
    else if (/.*-\d+$/.test(slug)) {
        const parts = slug.split('-');
        const companyId = parts[parts.length - 1];
        const companyName = parts.slice(0, -3).join('-'); // crude logic
        apiUrl = `http://localhost:3000/jobapi/v3/search?noOfResults=20&urlType=search_by_company_id&searchType=groupsearch&companyName=${companyName}&companyId=${companyId}&pageNo=1&seoKey=${slug}&src=directSearch&latLong=`;
    }
    // 3. Normal job search (like `lodha-group-jobs`)
    else if (slug.includes('-jobs')) {
        const keyword = slug.replace(/-jobs$/, '').replace(/-/g, ' ');
        apiUrl = `http://localhost:3000/jobapi/v3/search?noOfResults=20&urlType=search_by_keyword&searchType=adv&keyword=${encodeURIComponent(
            keyword
        )}&pageNo=1&k=${encodeURIComponent(
            keyword
        )}&nignbevent_src=jobsearchDeskGNB&seoKey=${slug}&src=jobsearchDesk&latLong=`;
    }
    // 4. 404
    else {
        apiUrl = `http://localhost:3000/not-found`;
    }

    return <div>API URL: <pre>{apiUrl}</pre></div>;
};

export default Page;
