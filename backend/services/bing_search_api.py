import requests
from config import Config

# OpenAI APIキーとBing Search APIの設定
BING_API_KEY = Config.BING_API_KEY
BING_ENDPOINT = "https://api.bing.microsoft.com/v7.0/search"

def fetch_bing_articles(keyword, count=3):
    headers = {"Ocp-Apim-Subscription-Key": BING_API_KEY}
    params = {"q": keyword, "count": count}

    try:
        response = requests.get(BING_ENDPOINT, headers=headers, params=params)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        raise Exception(f"Bing API Request Error: {str(e)}")

    data = response.json()
    results = []
    if "webPages" in data and "value" in data["webPages"]:
        for item in data["webPages"]["value"]:
            results.append({
                "title": item.get("name"),
                "url": item.get("url"),
                "snippet": item.get("snippet"),
                "displayUrl": item.get("displayUrl"),
                "datePublished": item.get("datePublished")
            })
    return results
