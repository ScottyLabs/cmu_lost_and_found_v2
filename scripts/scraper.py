import requests
from bs4 import BeautifulSoup

from datetime import datetime

response = requests.get('https://www.cs.cmu.edu/~lostfound/')

soup = BeautifulSoup(response.text, 'html.parser')

table = soup.find_all('tr')

def send_data(obj):
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
    # print("row", row)
    column_marker = 0
    rowcount += 1
    if (rowcount == 1):
        continue
    columns = row.find_all('td')
    data = []
    for column in columns:
        # new_table.iat[row_marker,column_marker] = column.get_text()
        # print(column)
        if column is not None:
            # print(type(column.contents[0]))
            strcontents = [str(x) for x in column.contents]
            data.append("".join(strcontents))
            # print(type(column))
            # print("contents", column.contents)
        # column_marker += 1
    print(data)
    if (len(columns) >= 4):
        info = {}
        
        rawDate = data[0].replace("Sept", "Sep").replace("July", "Jul").replace("March", "Mar").replace("2017", "17")

        dt = datetime.strptime(rawDate, "%d %b %y")

        info["dateFound"] = dt.strftime("%m/%d/%y")
        info["timeFound"] = data[1].upper()

        theName = data[2]
        cleaned = clean(theName)
        info["name"], info["image"] = extract_url(cleaned)
        found = clean(data[3])
        info["whereFound"] = found
        info["description"] = clean(data[4])
        info["category"] = "Other" # for now
        info["whereToRetrieve"] = "Gates" # for now
        info["imagePermission"] = True # for now
        info["status"] = "available" # for now

        print(info)
        send_data(info)
