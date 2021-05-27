import requests
from bs4 import BeautifulSoup
import re

from datetime import datetime

response = requests.get('https://www.cs.cmu.edu/~lostfound/')
# fix broken br tags
text = re.sub("<br\s", "<br>", response.text)
soup = BeautifulSoup(text, 'html.parser')

table = soup.find_all('tr')

def send_data(obj):
    # disable authentication for this to work (isAdmin in items.ts)
    r = requests.post('http://localhost:3080/api/items/add', data = obj)
    print(r)

def clean(s):
    s = s.replace("<b>", "")
    s = s.replace("</b>", "")
    s = s.replace("<br/>", " ")
    s = s.replace("<i>Claimed!</i>", "")
    s = s.replace("<i>", "")
    s = s.replace("</i>", "")
    s = s.replace("  ", " ")
    s = s.replace(";", "")
    s = s.replace("<p>", "")
    s = s.replace("</p>", "")
    s = s.replace(" Must Claim in Person", " Must claim in person")
    s = s.replace(" Must claim in person", ". Must claim in person")
    s = s.replace(" Must identify in person", ". Must identify in person")

    return s

def extract_url(s):
    # print(s)
    x = s.find('">')
    if (x is not -1):
        k = s[x:].find('<')
        return ((s[x:])[2:k], "https://www.cs.cmu.edu/~lostfound/" + s[9:x])
    else:
        return (s, "")

rowcount = 0

for row in soup.find_all('tr'):
    column_marker = 0
    rowcount += 1
    if (rowcount == 1):
        continue
    columns = row.find_all('td')
    data = []
    for column in columns:
        if column is not None:
            strcontents = [str(x) for x in column.contents]
            data.append("".join(strcontents))
    if (len(columns) >= 4):
        info = {}
        
        rawDate = data[0].replace("Sept", "Sep").replace("July", "Jul").replace("March", "Mar").replace("2017", "17")

        dt = datetime.strptime(rawDate, "%d %b %y")

        info["dateFound"] = dt.strftime("%m/%d/%y")
        timeFound = data[1][:-3].upper()
        if data[1][-2:] == "pm":
            hours, mins = timeFound.split(":")
            if hours == "12":
                hourStr = "00"
            else:
                hourStr = str(int(hours)+12)
            timeFound = hourStr + ":" + mins.strip()
        info["timeFound"] = timeFound

        theName = data[2]
        cleaned = clean(theName)
        info["name"], info["image"] = extract_url(cleaned)
        
        found = clean(data[3])
        info["whereFound"] = found
        info["description"] = clean(data[4])
        info["category"] = "Miscellaneous"  # for now
        info["whereToRetrieve"] = "GHC 6203, 412.268.8525, lostfound@cs.cmu.edu."  # for now
        info["imagePermission"] = True # for now
        if "claimed!" in clean(data[5]).lower():
            status = "claimed"
        else:
            status = "available"
        info["status"] = status # for now
        info["approved"] = "true"

        print(info)
        send_data(info)
