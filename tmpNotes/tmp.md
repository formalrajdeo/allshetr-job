  r.c = function(e) {
        var r = "",
            t = e.location,
            a = void 0 === t ? "" : t,
            o = e.keyword,
            i = void 0 === o ? "" : o,
            p = e.pageNo,
            m = void 0 === p ? 1 : p,
            d = e.companyId,
            y = e.companyName,
            b = e.industryLabel,
            f = e.premiumTypeCategory,
            g = (e.urlType, e.groupName),
            h = e.groupId,
            v = e.groupLocation;
        switch (a = (a = a.split(",")[0]).replace(n.m, ""), Object.keys(s).forEach((function(e) {
                -1 !== i.indexOf(e) && (i = i.replace(s[e].reg, s[e].replace)), -1 !== a.indexOf(e) && (a = a.replace(s[e].reg, s[e].replace))
            })), i && (i = i.replace(/[^.+#\-'" a-zA-Z0-9]/gi, " ").replace(/and {1,}$/g, "").trim()), a && (a = a.replace(/[-(]/g, " ").replace(/[^, a-zA-Z0-9]/gi, "").replace(/,{1,}$/g, "").replace(/\d+$/, "").trim()), function(e) {
                var r = e.location,
                    t = e.keyword,
                    a = e.urlType;
                if (t && r) switch (a) {
                    case n.x.search_by_keyword:
                    case n.x.search_by_location:
                    case n.x.walkin_search:
                    case n.x.search_by_company_id:
                    case n.x.search_by_group_id:
                        return n.x.search_by_key_loc;
                    case n.x.psu_search_by_keyword:
                    case n.x.psu_search_by_location:
                    case n.x.psu_search_by_industry:
                    case n.x.search_by_psu_company_id:
                        return n.x.psu_search_by_key_loc;
                    case n.x.premium_search_by_keyword:
                    case n.x.premium_search_by_location:
                    case n.x.premium_mba_search_by_category:
                    case n.x.premium_engg_search_by_category:
                        return n.x.premium_search_by_key_loc;
                    default:
                        return a
                }
                if (t && !r) switch (a) {
                    case n.x.search_by_key_loc:
                    case n.x.search_by_location:
                    case n.x.walkin_search:
                    case n.x.search_by_company_id:
                    case n.x.search_by_group_id:
                        return n.x.search_by_keyword;
                    case n.x.psu_search_by_key_loc:
                    case n.x.psu_search_by_location:
                    case n.x.psu_search_by_industry:
                    case n.x.search_by_psu_company_id:
                        return n.x.psu_search_by_keyword;
                    case n.x.premium_search_by_key_loc:
                    case n.x.premium_search_by_location:
                    case n.x.premium_mba_search_by_category:
                    case n.x.premium_engg_search_by_category:
                        return n.x.premium_search_by_keyword;
                    default:
                        return a
                }
                if (!t && r) switch (a) {
                    case n.x.search_by_key_loc:
                    case n.x.search_by_keyword:
                    case n.x.walkin_search:
                    case n.x.search_by_company_id:
                    case n.x.search_by_group_id:
                        return n.x.search_by_location;
                    case n.x.psu_search_by_key_loc:
                    case n.x.psu_search_by_keyword:
                    case n.x.psu_search_by_industry:
                    case n.x.search_by_psu_company_id:
                        return n.x.psu_search_by_location;
                    case n.x.premium_search_by_key_loc:
                    case n.x.premium_search_by_keyword:
                    case n.x.premium_mba_search_by_category:
                    case n.x.premium_engg_search_by_category:
                        return n.x.premium_search_by_location;
                    default:
                        return a
                }
                return a
            }(e)) {
            case n.x.search_by_keyword:
                r = function(e) {
                    return (e = u(e, !0)) ? "/".concat(e, "-jobs") : c
                }(i);
                break;
            case n.x.search_by_location:
                r = function(e) {
                    return (e = u(e)) ? "/jobs-in-".concat(e) : c
                }(a);
                break;
            case n.x.search_by_key_loc:
                r = function(e, r) {
                    return e = u(e, !0), r = u(r), e || r ? e && !r ? "/".concat(e, "-jobs") : r && !e ? "/jobs-in-".concat(r) : e && r ? "/".concat(e, "-jobs-in-").concat(r) : void 0 : c
                }(i, a);
                break;
            case n.x.psu_search_by_industry:
                r = function(e) {
                    return (e = u(e)) ? "/".concat(e, "-jobs-recruitment") : c
                }(b);
                break;
            case n.x.search_by_psu_company_id:
                r = function(e, r) {
                    return e = u(e), r = u(r), (e || r) && e && r ? "/".concat(e, "-recruitment-jobs-").concat(r) : c
                }(y, d);
                break;
            case n.x.search_by_company_id:
                r = function(e, r) {
                    return e = u(e), r = u(r), (e || r) && e && r ? "/".concat(e, "-jobs-careers-").concat(r) : c
                }(y, d);
                break;
            case n.x.psu_search_by_keyword:
                r = function(e) {
                    return (e = u(e, !0)) ? "/psu-government-jobs-for-".concat(e) : c
                }(i);
                break;
            case n.x.psu_search_by_location:
                r = function(e) {
                    return (e = u(e)) ? "/psu-government-jobs-in-".concat(e) : c
                }(a);
                break;
            case n.x.psu_search_by_key_loc:
                r = function(e, r) {
                    return e = u(e, !0), r = u(r), e || r ? e && !r ? "/psu-government-jobs-for-".concat(e) : r && !e ? "/psu-government-jobs-in-".concat(r) : r && e ? "/psu-government-jobs-for-".concat(e, "-in-").concat(r) : void 0 : c
                }(i, a);
                break;
            case n.x.premium_search_by_keyword:
                r = function(e) {
                    return (e = u(e, !0)) ? "/premium-".concat(e, "-jobs") : c
                }(i);
                break;
            case n.x.premium_search_by_location:
                r = function(e) {
                    return (e = u(e)) ? "/premium-jobs-in-".concat(e) : c
                }(a);
                break;
            case n.x.premium_search_by_key_loc:
                r = function(e, r) {
                    return e = u(e, !0), u(r), e || r ? e && !r ? "/premium-".concat(e, "-jobs") : !e && r ? "/premium-jobs-in-".concat(r) : e && r ? "/premium-".concat(e, "-jobs-in-").concat(r) : void(e && r && "/premium-".concat(e, "-jobs-in-").concat(r)) : c
                }(i, a);
                break;
            case n.x.premium_engg_search_by_category:
                r = function(e) {
                    return (e = u(e)) ? "/premium-jobs-for-iit-engineering-graduates-in-".concat(e) : c
                }(f);
                break;
            case n.x.premium_mba_search_by_category:
                r = function(e) {
                    return (e = u(e)) ? "/premium-jobs-for-iim-mba-graduates-in-".concat(e) : c
                }(f);
                break;
            case n.x.walkin_search:
                r = function(e, r) {
                    return e = u(e, !0), r = u(r), e || r ? e && !r ? "/walkin-".concat(e, "-jobs") : r && !e ? "/walkin-jobs-in-".concat(r) : e && r ? "/walkin-".concat(e, "-jobs-in-").concat(r) : void 0 : "/walkin-jobs"
                }(i, a);
                break;
            case n.x.search_by_group_id:
                r = function(e, r, t) {
                    return e = u(e), r = u(r), (e || r) && e && r ? "/".concat(e, "-jobs-careers-in-").concat(t, "-gid-").concat(r) : c
                }(g, h, v);
                break;
            default:
                r = c
        }
        return r = r.replace(/ /gi, "-").replace(/,/g, "-").replace(/-+/g, "-"), r = l(r), (m = parseInt(m)) && m > 1 ? "".concat(r, "-").concat(m) : r
    };

var c = {

        urls: [{
            url: "/walkin-jobs-:pageNo",
            routeParams: {
                urlType: a.x.walkin_search,
                searchType: a.w.adv
            }
        }, {
            url: "/jobs",
            routeParams: {
                urlType: a.x.jobs_search,
                searchType: a.w.adv
            }
        }, {
            url: "/walkin-jobs",
            routeParams: {
                urlType: a.x.walkin_search,
                searchType: a.w.adv
            }
        }, {
            url: "/premium-jobs-for-iim-mba-graduates-in-:premiumTypeCategory",
            routeParams: {
                urlType: a.x.premium_mba_search_by_category,
                searchType: a.w.np
            }
        }, {
            url: "/premium-jobs-for-iit-engineering-graduates-in-:premiumTypeCategory",
            routeParams: {
                urlType: a.x.premium_engg_search_by_category,
                searchType: a.w.np
            }
        }, {
            url: "/premium-jobs-in-:location",
            routeParams: {
                urlType: a.x.premium_search_by_location,
                searchType: a.w.np
            }
        }, {
            url: "/premium-:keyword-jobs-in-:location",
            routeParams: {
                urlType: a.x.premium_search_by_key_loc,
                searchType: a.w.np
            }
        }, {
            url: "/premium-:keyword-jobs-:pageNo",
            routeParams: {
                urlType: a.x.premium_search_by_keyword,
                searchType: a.w.np
            }
        }, {
            url: "/premium-:keyword-jobs",
            routeParams: {
                urlType: a.x.premium_search_by_keyword,
                searchType: a.w.np
            }
        }, {
            url: "/psu-government-jobs-for-:keyword-in-:location",
            routeParams: {
                urlType: a.x.psu_search_by_key_loc,
                searchType: a.w.psu
            }
        }, {
            url: "/psu-government-jobs-in-:location",
            routeParams: {
                urlType: a.x.psu_search_by_location,
                searchType: a.w.psu
            }
        }, {
            url: "/psu-government-jobs-for-:keyword-:pageNo",
            routeParams: {
                urlType: a.x.psu_search_by_keyword,
                searchType: a.w.psu
            }
        }, {
            url: "/psu-government-jobs-for-:keyword",
            routeParams: {
                urlType: a.x.psu_search_by_keyword,
                searchType: a.w.psu
            }
        }, {
            url: "/:industryLabel-jobs-recruitment-:pageNo",
            routeParams: {
                urlType: a.x.psu_search_by_industry,
                searchType: a.w.psu
            }
        }, {
            url: "/:industryLabel-jobs-recruitment",
            routeParams: {
                urlType: a.x.psu_search_by_industry,
                searchType: a.w.psu
            }
        }, {
            url: "/:keyword-jobs-in-:location",
            routeParams: {
                urlType: a.x.search_by_key_loc,
                searchType: a.w.adv
            }
        }, {
            url: "/jobs-in-:location",
            routeParams: {
                urlType: a.x.search_by_location,
                searchType: a.w.adv
            }
        }, {
            url: "/:groupName-jobs-careers-in-:groupLocation-gid-:groupId-:pageNo",
            routeParams: {
                urlType: a.x.search_by_group_id,
                searchType: a.w.groupidsearch
            }
        }, {
            url: "/:groupName-jobs-careers-in-:groupLocation-gid-:groupId",
            routeParams: {
                urlType: a.x.search_by_group_id,
                searchType: a.w.groupidsearch
            }
        }, {
            url: "/:companyName-jobs-careers-:companyId-:pageNo",
            routeParams: {
                urlType: a.x.search_by_company_id,
                searchType: a.w.groupsearch
            }
        }, {
            url: "/:companyName-jobs-careers-:companyId",
            routeParams: {
                urlType: a.x.search_by_company_id,
                searchType: a.w.groupsearch
            }
        }, {
            url: "/:companyName-recruitment-jobs-:companyId-:pageNo",
            routeParams: {
                urlType: a.x.search_by_psu_company_id,
                searchType: a.w.adv,
                isRecruitmentJobSearch: !0
            }
        }, {
            url: "/:companyName-recruitment-jobs-:companyId",
            routeParams: {
                urlType: a.x.search_by_psu_company_id,
                searchType: a.w.adv,
                isRecruitmentJobSearch: !0
            }
        }, {
            url: "/:keyword-jobs-:pageNo",
            routeParams: {
                urlType: a.x.search_by_keyword,
                searchType: a.w.adv
            }
        }, {
            url: "/:keyword-jobs",
            routeParams: {
                urlType: a.x.search_by_keyword,
                searchType: a.w.adv
            }
        }],
        component: "searchResult",
        name: "searchResult"
    };
    r.b = [{
        url: "/",
        component: "naukriHome",
        name: "naukriHome"
    }, {
        url: "/".concat(a.D, "-:groupStr"),
        component: "companyPage",
        name: "companyPage",
        routeParams: {
            urlType: a.x.walkin_search,
            searchType: a.w.adv
        }
    }, {
        url: "/working-at-:groupInfm",
        component: "companyPage",
        name: "companyPage",
        routeParams: {
            urlType: a.x.walkin_search,
            searchType: a.w.adv
        }
    }, {
        url: "/:groupName-overview-:groupId",
        component: "companyPage",
        name: "companyPage",
        routeParams: {
            urlType: a.x.walkin_search,
            searchType: a.w.adv
        }
    }, function(e) {
        for (var r = 1; r < arguments.length; r++) {
            var t = null != arguments[r] ? arguments[r] : {};
            r % 2 ? o(Object(t), !0).forEach((function(r) {
                i(e, r, t[r])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : o(Object(t)).forEach((function(r) {
                Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r))
            }))
        }
        return e
    }({}, c)]


    Sample urls => 

https://www.naukri.com/financial-services-companies-in-india-ind113
https://www.naukri.com/westernacher-consulting-overview-4640387
https://www.naukri.com/westernacher-consulting-jobs-careers-in-bengaluru-gid-4640387

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

-------
Bro i am creating nextjs app dir => app/[...slug]/page.tsx
Where base on above sample url i have to call /search? but with different dynamic params so for now just print in browser dynamic created GET url with params based on url entered in browser okay, use above minified js try make best code possible okay.
Note each and every switch case is important carefully cover all cases please in depth.