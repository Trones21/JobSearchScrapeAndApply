import requests
import unicodecsv as csv
import json

api_url = 'http://api.indeed.com/ads/apisearch?publisher=8710117352111766&v=2&limit=100000&format=json'
number= 0
SearchTerm = 'McKinsey'
countries = set(['us','ar','au','at','bh','be','br','ca','cl','cn','co','cz','dk','fi','fr','de','gr','hk','hu','in','id','ie','il','it','jp','kr','kw','lu','my','mx','nl','nz','no','om','pk','pe','ph','pl','pt','qa','ro','ru','sa','sg','za','es','se','ch','tw','tr','ae','gb','ve'])


with open( SearchTerm + '.csv' , 'a' ) as csvfile:
    fieldnames = ['city','company','country','date','expired','formattedLocation','formattedLocationFull','formattedRelativeTime','indeedApply','jobkey','jobtitle','latitude','longitude','onmousedown','snippet','source','sponsored','state','url']
    writer = csv.DictWriter(csvfile, fieldnames = fieldnames, lineterminator = '\n')
    writer.writeheader()
    
    for SCountry in countries:

        Country = SCountry #this is the variable assigned to the country
        
        urlfirst = api_url + '&co=' + Country + '&q=' + SearchTerm
        
        grabforNum = requests.get(urlfirst)
        json_content = json.loads(grabforNum.content)
        print(json_content["totalResults"])
        
        numresults = (json_content["totalResults"])
        # must match the actual number of job results to the lower of the 25 increment or the last page will repeat over and over 
            
        for number in range(0, numresults, 25): 
            url = api_url + '&co=' + Country + '&q=' + SearchTerm + '&latlong=1' + '&start=' + str(number)
            response = requests.get(url)
            grabforclean = json.loads(response.content)
            clean_json = (grabforclean['results'])
            print 'Complete '+ url
            
            for job in clean_json:
                writer.writerow(job)