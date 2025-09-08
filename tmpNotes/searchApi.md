Got it, you're trying to **replicate the Naukri job search API** behavior for your own use (e.g., scraping, automation, or building a similar system). While Naukri's APIs aren't officially public or documented, we can reverse-engineer **common query parameters** and their **expected values** based on the URLs you've provided.

---

## ✅ Core `GET` URL Format

```
https://www.naukri.com/jobapi/v3/search
```

---

## ✅ Common **Query Parameters** and Their Purpose

| Param Name          | Description                                | Sample Values                                | Notes                                 |
| ------------------- | ------------------------------------------ | -------------------------------------------- | ------------------------------------- |
| `noOfResults`       | Number of results per page                 | `20`, `10`, `50`                             | Usually 10–20                         |
| `pageNo`            | Page number                                | `1`, `2`, etc.                               | Pagination                            |
| `searchType`        | Type of search                             | `adv`, `groupidsearch`, `groupidsearchsrp`   | Important                             |
| `urlType`           | Type of URL structure                      | `search_by_key_loc`, `group_location_search` | Related to how the search is filtered |
| `keyword` or `k`    | Keyword for job search                     | `node.js`, `react`, `java`                   | Can be in both `k` and `keyword`      |
| `location` or `l`   | Location of job                            | `thane`, `mumbai`, `thane, mumbai`           | Both `location` and `l` used          |
| `sort`              | Sorting type                               | `p` (probably for "relevance" or "posted")   | Optional                              |
| `wfhType`           | Work from home filter                      | `0` (onsite), `1` (WFH), `2` (hybrid?)       | Often optional                        |
| `experience`        | Years of experience                        | `10`, `5`, `0`                               | Numeric                               |
| `jobPostType`       | Job posting type                           | `1` (possibly full-time)                     | Rarely documented                     |
| `ctcFilter`         | Salary filter                              | `10to15`, `5to10`, etc.                      | String range                          |
| `functionAreaIdGid` | Functional area                            | `5` (e.g., IT/Engineering)                   | ID mapped to a function area          |
| `industryTypeIdGid` | Industry type                              | `109` (IT Services), `113` (Finance), etc.   | Industry ID                           |
| `ugTypeGid`         | UG Qualification                           | `11`, etc.                                   | Optional                              |
| `qbusinessSize`     | Company size                               | `211`                                        | Optional                              |
| `pgTypeGid`         | Possibly page or platform type             | `9511`, etc.                                 | Internal use                          |
| `glbl_qcrc`         | Some global search filter or session id    | `1028`, etc.                                 | Optional                              |
| `cityTypeGid`       | City type or code                          | `134`, `9509`                                | Can repeat                            |
| `jobAge`            | Job posting age (in days)                  | `15`, `30`, `7`                              | e.g., last 15 days                    |
| `sid`               | Session ID                                 | Random string                                | Often optional                        |
| `src`               | Source of search                           | `directSearch`, `cluster`, `jobsearchDesk`   | May affect analytics only             |
| `seoKey`            | SEO-friendly URL key                       | `node-dot-js-jobs-in-thane`                  | Derived from keyword/location         |
| `latLong`           | Location coordinates (latitude, longitude) | Empty or `xx,yy`                             | Often empty                           |

---

## 🔒 Fixed or Limited-Value Parameters

| Parameter     | Type          | Values (Observed/Fixed)                                                               |
| ------------- | ------------- | ------------------------------------------------------------------------------------- |
| `searchType`  | Enum-like     | `adv`, `groupidsearch`, `groupidsearchsrp` – used for advanced search, group searches |
| `urlType`     | Enum-like     | `search_by_key_loc`, `group_location_search`, `search_by_industry_id`, etc.           |
| `jobPostType` | Enum          | `1` – might mean Full-time or Regular jobs                                            |
| `wfhType`     | Enum          | `0` (onsite), `1` (WFH), `2` (hybrid?)                                                |
| `sort`        | Enum          | `p`, `r`, maybe `d` – usually `p` (popularity or posted date)                         |
| `ctcFilter`   | Fixed pattern | `XtoY` (e.g., `10to15`)                                                               |
| `experience`  | Numeric       | `0` to `20+` years                                                                    |
| `jobAge`      | Numeric       | `1`, `7`, `15`, `30`, etc.                                                            |

---

## 🧠 Example API Query (Well-Formed)

```http
GET https://www.naukri.com/jobapi/v3/search?
noOfResults=20
&pageNo=1
&searchType=adv
&urlType=search_by_key_loc
&keyword=node.js
&location=thane%2C%20mumbai
&experience=10
&jobPostType=1
&ctcFilter=10to15
&functionAreaIdGid=5
&industryTypeIdGid=109
&jobAge=15
&sort=p
&src=cluster
```

---

## 🚫 Notes / Warnings

* These are **undocumented internal APIs**; usage may violate Naukri's TOS if you're scraping or automating.
* Some parameters might be required depending on `searchType`.
* IDs like `functionAreaIdGid`, `industryTypeIdGid`, etc., are likely based on Naukri's internal database enums.
* Try observing the frontend network tab for real-time request patterns if you want to map new filters.

---

Do you want me to help you **build a reusable URL constructor function** (e.g., in JS or Python) based on this structure?
