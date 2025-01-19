#!/usr/bin/env python
# coding: utf-8

# In[25]:


import requests
from bs4 import BeautifulSoup
import csv

def scrape_news_page(page_number):
    url = f"https://www.mse.mk/mk/news/latest/{page_number}"  # URL за одредена страна
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print(f"Failed to fetch page {page_number}. Status code: {response.status_code}")
        return []

    soup = BeautifulSoup(response.content, 'html.parser')

    # Пребарување на елементите за вести
    news_items = []
    articles = soup.select('#news-content > div')  # Селектирање на сите деца на #news-content
    for article in articles:
        # Пребарување на колумната што го содржи линкот
        title_element = article.select_one('div.col-md-11 > a')
        date_element = article.select_one('div.col-md-1')

        if not title_element or not date_element:
            continue

        # Извлекување на податоците
        title = title_element.text.strip()
        link = title_element['href']
        date = date_element.text.strip()

        news_items.append({
            "title": title,
            "link": f"https://www.mse.mk{link}",
            "date": date
        })

    return news_items

def scrape_all_news(total_pages):
    all_news = []
    for page in range(1, total_pages + 1):
        print(f"Scraping page {page}...")
        news_items = scrape_news_page(page)
        if news_items:
            all_news.extend(news_items)
    return all_news

def save_news_to_csv(news_items, filename="news.csv"):
    with open(filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=["date", "title", "link"])
        writer.writeheader()
        writer.writerows(news_items)
    print(f"News saved to {filename}")

if __name__ == "__main__":
    total_pages = 834  # Вкупен број на страни
    news = scrape_all_news(total_pages)
    if news:
        save_news_to_csv(news)
    else:
        print("No news articles found.")


# In[ ]:




