import requests
import random
import time

for i in range(10):
    value=random.randrange(0, 100)
    requests.get("https://api.thingspeak.com/update?api_key=YQW1RME0NY7VDR29&field2="+str(value))
    time.sleep(20)
