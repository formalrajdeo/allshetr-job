1. [jdURL] Specific Job Detail Page => /job-listings-typescript-and-graphql-senior-developer-globallogic-bengaluru-5-to-10-years-050925009683  
2. [staticUrl] All job listings by this company (using companyId) => /globallogic-jobs-careers-2937


In app search (with filter sidebar option) | More results will come ==>
url => https://www.naukri.com/lodha-group-jobs?k=lodha%20group&nignbevent_src=jobsearchDeskGNB
api => https://www.naukri.com/jobapi/v3/search?noOfResults=20&urlType=search_by_keyword&searchType=adv&keyword=lodha%20group&pageNo=1&k=lodha%20group&nignbevent_src=jobsearchDeskGNB&seoKey=lodha-group-jobs&src=jobsearchDesk&latLong=

Google specific job ==>
url => https://www.naukri.com/job-listings-typescript-and-graphql-senior-developer-globallogic-bengaluru-5-to-10-years-050925009683
api => https://www.naukri.com/jobapi/v2/search/simjobs/050925009683?noOfResults=6&searchType=sim

Google single company lists of job posted (with filter sidebar option) | Exact all records will come cause of companyId used ==>
url => https://www.naukri.com/globallogic-jobs-careers-2937
api => https://www.naukri.com/jobapi/v3/search?noOfResults=20&urlType=search_by_company_id&searchType=groupsearch&companyName=globallogic&companyId=2937&pageNo=1&seoKey=globallogic-jobs-careers-2937&src=directSearch&latLong=


-------------------
Example Outputs:

/lodha-group-jobs
→ http://localhost:3000/jobapi/v3/search?...&keyword=lodha group...

/globallogic-jobs-careers-2937
→ http://localhost:3000/jobapi/v3/search?...&companyId=2937...

/job-listings-typescript-and-graphql-senior-developer-globallogic-bengaluru-5-to-10-years-050925009683
→ http://localhost:3000/jobapi/v2/search/simjobs/050925009683?...

/gibberish
→ http://localhost:3000/not-found


=====================
In app search (with filter sidebar option) | More results will come ==>
url => http://localhost:3000/lodha-group-jobs?k=lodha%20group&nignbevent_src=jobsearchDeskGNB
api => http://localhost:3000/jobapi/v3/search?noOfResults=20&urlType=search_by_keyword&searchType=adv&keyword=lodha%20group&pageNo=1&k=lodha%20group&nignbevent_src=jobsearchDeskGNB&seoKey=lodha-group-jobs&src=jobsearchDesk&latLong=

Google specific job ==>
url => http://localhost:3000/job-listings-typescript-and-graphql-senior-developer-globallogic-bengaluru-5-to-10-years-050925009683
api => http://localhost:3000/jobapi/v2/search/simjobs/050925009683?noOfResults=6&searchType=sim

Google single company lists of job posted (with filter sidebar option) | Exact all records will come cause of companyId used ==>
url => http://localhost:3000/globallogic-jobs-careers-2937
api => http://localhost:3000/jobapi/v3/search?noOfResults=20&urlType=search_by_company_id&searchType=groupsearch&companyName=globallogic&companyId=2937&pageNo=1&seoKey=globallogic-jobs-careers-2937&src=directSearch&latLong=

404 not found ==>
url => http://localhost:3000/giberish
api => http://localhost:3000/not-found

