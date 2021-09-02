//Two Subdomains
//boards.greenhouse.io
//app.grennhouse.io

//It would be great if I could figure out the ID scheme
//is it always X digits?
//What is the highest ID?

//Raw URL Examples (Scraped):
//https://boards.greenhouse.io/cruise/jobs/3351596?gh_jid=3351596&gh_src=1xdap08r1&s=LinkedIn&source=LinkedIn
//https://app.greenhouse.io/embed/job_app?token=3259366&gh_src=dbd19ebc1&s=LinkedIn&source=LinkedIn

//You don't need the extra parameters for either boards or app 
//https://boards.greenhouse.io/<Company>/jobs/<jobID>
//https://app.greenhouse.io/embed/job_app?token=<jobID>
       //app - redirects to boards, but the path after / remains the same
