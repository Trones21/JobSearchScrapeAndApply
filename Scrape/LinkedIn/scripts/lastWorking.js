//Need to see if the results are different for wghen using zipcodes, or geoIDs, 
//IMPORTANT: city doesn't seem to give me the same amount of results as the frontend :S  !!!!! 

let headers = {
    "headers": {
        "accept": "application/vnd.linkedin.normalized+json+2.1",
        "accept-language": "en-US,en;q=0.9",
        "csrf-token": "Input your CSRF token here",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-li-lang": "en_US",
        "x-li-page-instance": "urn:li:page:d_flagship3_search_srp_jobs;JDEHRzCjTmqz3vcWQHj5vQ==",
        "x-li-track": "{\"clientVersion\":\"1.8.4464\",\"mpVersion\":\"1.8.4464\",\"osName\":\"web\",\"timezoneOffset\":-7,\"timezone\":\"America/Los_Angeles\",\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\",\"displayDensity\":1.25,\"displayWidth\":2560,\"displayHeight\":1441.25}",
        "x-restli-protocol-version": "2.0.0"
    },
    "referrer": "https://www.linkedin.com/jobs/search/?f_TPR=r2592000&geoId=90000084&keywords=software%20engineer&location=San%20Francisco%20Bay%20Area&start=25",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
};

/* Location string must be URIencoded - {City, State, Country} with a slight modification - commas should be %2C*/
// ex Yountville%2C%20California%2C%20United%20States
let locations = ["Alameda", "Albany", "American Canyon", "Antioch", "Atherton", "Belmont", "Belvedere", "Benicia", "Berkeley", "Brentwood", "Brisbane", "Burlingame", "Calistoga", "Campbell", "Clayton", "Cloverdale", "Colma", "Concord", "Corte Madera", "Cotati", "Cupertino", "Daly City", "Danville", "Dixon", "Dublin", "East Palo Alto", "El Cerrito", "Emeryville", "Fairfax", "Fairfield", "Foster City", "Fremont", "Gilroy", "Half Moon Bay", "Hayward", "Healdsburg", "Hercules", "Hillsborough", "Lafayette", "Larkspur", "Livermore", "Los Altos", "Los Altos Hills", "Los Gatos", "Martinez", "Menlo Park", "Mill Valley", "Millbrae", "Milpitas", "Monte Sereno", "Moraga", "Morgan Hill", "Mountain View", "Napa", "Newark", "Novato", "Oakland", "Oakley", "Orinda", "Pacifica", "Palo Alto", "Petaluma", "Piedmont", "Pinole", "Pittsburg", "Pleasant Hill", "Pleasanton", "Portola Valley", "Redwood City", "Richmond", "Rio Vista", "Rohnert Park", "Ross", "St. Helena", "San Anselmo", "San Bruno", "San Carlos",
    "San Francisco", "San Jose", "San Leandro", "San Mateo", "San Pablo", "San Rafael", "San Ramon", "Santa Clara", "Santa Rosa", "Saratoga", "Sausalito", "Sebastopol", "Sonoma", "South San Francisco", "Suisun City", "Sunnyvale", "Tiburon", "Union City", "Vacaville", "Vallejo", "Walnut Creek", "Windsor", "Woodside", "Yountville"].map(i => encodeURI(i + ', California, United States').replace(/,/g, '%2C'));

async function main() {
    let locationCounts = []
    let links = [];
    //locations = locations.slice(7, 20);
    for (let location of locations) {

        await sleep(500);

        let res = await callAPI(0, 50, location);
        links.push(...await parseData(res));
        locationCounts.push({ loc: location, count: res.data.paging.total })
        console.log({ loc: res.loc, count: res.data.paging.total })

        if (res.data.paging.total > 50) {
            let max = (res.data.paging.total >= 1000) ? 1000 : res.data.paging.total;
            for (let start = 50; start < max; start += 50) {
                let res = await callAPI(start, 50, location)
                links.push(...await parseData(res))
            }
        }
    }

    /*Still parsing but let's do it all at once*/
    links = links.filter(i => i !== false)
    links.forEach(i => {
        i.domain = i.link.split('/')[2];
    }
    )
    console.log(locationCounts);
    console.log(links);

}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//geoUrn-%3Eurn%3Ali%3Afs_geo%3A90000084,

async function parseData(data) {
    if (data) {
        let d = await data.included.filter(i => i.applyMethod).filter(i => i.applyMethod["$type"] === "com.linkedin.voyager.jobs.OffsiteApply").map(i => {
            return {
                id: i.dashEntityUrn,
                loc: i.formattedLocation,
                link: i.applyMethod.companyApplyUrl
            }
        }
        )
        return d;
    }
    return [false];

}


async function callAPI(startNum, count, location) {
    try {
        let res = await fetch(`https://www.linkedin.com/voyager/api/search/hits?decorationId=com.linkedin.voyager.deco.jserp.WebJobSearchHitWithSalary-17
&count=${count}
&filters=List(timePostedRange-%3Er2592000,
locationFallback-%3E${location},
distance-%3E0,
resultType-%3EJOBS)
&keywords=software%20engineer&origin=JOB_SEARCH_PAGE_JOB_FILTER&q=jserpFilters&queryContext=List(primaryHitType-%3EJOBS,spellCorrectionEnabled-%3Etrue)
&start=${startNum}
&topNRequestedFlavors=List(HIDDEN_GEM,IN_NETWORK,SCHOOL_RECRUIT,COMPANY_RECRUIT,SALARY,JOB_SEEKER_QUALIFIED,PREFERRED_COMMUTE,PRE_SCREENING_QUESTIONS,SKILL_ASSESSMENTS,ACTIVELY_HIRING_COMPANY,TOP_APPLICANT)`, headers)
        let data = await res.json();
        return data;
    } catch (e) {
        return [false];
    }
}

(async () => {
    main();
    console.log(locations)
    //     let test = await callAPI(0, 10, locations[20], true)
    //     console.log(test.data.paging.total);
}
)();
