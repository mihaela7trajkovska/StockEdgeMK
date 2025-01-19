#!/usr/bin/env python
# coding: utf-8

# In[3]:


import csv
import json

def csv_to_json(csv_file, json_file):
    data = []
    with open(csv_file, encoding='utf-8') as csvf:
        csv_reader = csv.DictReader(csvf)
        for row in csv_reader:
            data.append(row)

    with open(json_file, 'w', encoding='utf-8') as jsonf:
        json.dump(data, jsonf, ensure_ascii=False, indent=4)


csv_to_json('analyzed_news.csv', 'analyzed_news.json')
print("JSON датотеката е успешно креирана!")


# In[ ]:


from flask import Flask, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route("/api/news-data", methods=["GET"])
def get_news_data():
    try:
        
        with open("analyzed_news.json", mode="r", encoding="utf-8") as json_file:
            news_data = json.load(json_file)
        return jsonify(news_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000)


# In[ ]:




