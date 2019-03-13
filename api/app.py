#!/usr/bin/python3
""" api module """

from flask import Flask
import re
import requests
import urllib

app = Flask(__name__)

here = requests.Session()
words = requests.Session()
words.params = {"key": "VP9JUPVY", "display": "minimal"}
here.params = {"app_id": "7DZj4FZSRWbx6FTL8JER", "app_code": "9SXulP-IrrM3ZJnMBwBHLQ"}

@app.route('/api/<query>', methods=['GET'])
def convert(query):
    """ cleans query and converts """
    old = query
    query = urllib.parse.unquote(query)
    if re.match("^\w*\.\w*\.\w*$", query):
        query = words.get('https://api.what3words.com/v2/forward?addr=' + query).json()
        print(query)
        if query.get("status").get("code"):
            return (old)
        coord = query.pop("geometry")
        data = {"prox": "{},{},250".format(coord.get("lat"), coord.get("lng")),
                "mode": "retrieveAddresses",
                "maxresults": 1}
        print (data)
        query = here.get('https://reverse.geocoder.api.here.com/6.2/reversegeocode.json', params=data).json()
        print (query)

        try:
            address = query.pop("Response").pop("View")[0].pop("Result")[0].pop("Location").pop("Address").pop("Label")
        except:
            return (old)
        return (address)

    else:
        query = here.get('https://geocoder.api.here.com/6.2/geocode.json?searchtext=' + old).json()
        print(query)
        try:
            query = query.pop("Response").pop("View")[0].pop("Result")[0].pop("Location")
            coord = query.pop("NavigationPosition")[0]
        except:
            return (old)
        data = {"coords": "{},{}".format(coord.get("Latitude"), coord.get("Longitude"))}
        print(data)
        query = words.get('https://api.what3words.com/v2/reverse', params=data).json()
        print(query)
        return (query.pop("words"))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
