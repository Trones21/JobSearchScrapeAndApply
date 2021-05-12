# LinkedIn

Just looping through the API. 

Instructions:
1. Copy into chrome snippets
2. Add your CSRF token
    (Can be found in any request sent to Linkedin, or in devtools -> application -> cookies. Look for the value next to JSESSIONID. The format is like this: "ajax:XXXXXXXXXXXXXX")
    https://i.imgur.com/VKS5SOf.png
3. Modify the parameters as you please


Some Notes:

Even if Linkedin says there are 12,987 results, it will only paginate up to 1000 results, requests with a higher start number will fail. Therefore you need to restrict the search so that you have less than 1000 results each time. My first approach was to do a separate search for each city. This works, but sometimes it doesn't return the same number of results as the frontend. For one of the cities my script only returned like 40 results whereas the LinkedIn frontend showed 710. 
So to get more results I'll consider using zipcodes and/or geoIds. We will probably need to make more requests to obtain the geoIds.  


# Indeed

**Warning: I haven't tested this since 2016!**

Scraping job search results using Indeeds API.

Each of these scripts has different features.

The most updated script is the one that saves to csv -- this one does not loop through search terms.

