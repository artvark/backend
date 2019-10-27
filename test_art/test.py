import requests 
import random
import math

url = "http://localhost:3000/art-management/art"





for i in range(0, 100):
    lat = 33.777156
    lng = -84.396202

    data = {
        "lng": lng,
        "lat": lat,
        "name": "Pretty Art " + str(random.randint(0,500))
    }
    headers = {}
    image = random.randint(1, 21)
    files = {'art': open(str(image) + '.png', 'rb')}

    res = requests.post(url, files=files, data=data, headers=headers)