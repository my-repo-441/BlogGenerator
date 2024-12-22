import requests
from bs4 import BeautifulSoup
import wikipediaapi
import random

def fetch_news_from_api(topic):
    url = f"https://newsapi.org/v2/everything?q={topic}&apiKey=YOUR_NEWSAPI_KEY"
    response = requests.get(url)
    articles = response.json().get("articles", [])
    return [f"{article['title']} - {article['description']}" for article in articles[:5]]

# def fetch_wikipedia_summary(topic):
#     # トピック名をエンコード（API用に安全な形式に変換）
#     formatted_topic = topic.replace(" ", "_")
#     url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{formatted_topic}"
#     headers = {
#         "User-Agent": "WordPressAutoPost/1.0 (keisuke@example.com) FetchBot/1.0"
#     }
#     response = requests.get(url, headers=headers)
#     if response.status_code == 200:
#         return response.json().get("extract", "No summary available.")
#     elif response.status_code == 404:
#         return f"Wikipedia page not found for topic: {topic}"
#     else:
#         response.raise_for_status()


def fetch_reddit_posts(topic):
    headers = {"User-Agent": "Mozilla/5.0"}
    url = f"https://www.reddit.com/search.json?q={topic}&sort=hot"
    response = requests.get(url, headers=headers)
    posts = response.json().get("data", {}).get("children", [])
    return [post["data"]["title"] for post in posts[:5]]

def fetch_random_content(topic):
    # sources = [fetch_news_from_api, fetch_wikipedia_summary, fetch_reddit_posts]
    sources = [fetch_news_from_api, fetch_reddit_posts]
    random.shuffle(sources)
    content = []
    for source in sources:
        try:
            content.append(source(topic))
        except Exception as e:
            print(f"Error fetching from source {source.__name__}: {e}")
    return "\n\n".join([item for sublist in content for item in (sublist if isinstance(sublist, list) else [sublist])])
