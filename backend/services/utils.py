import os
import requests
from bs4 import BeautifulSoup

DATA_FOLDER = "./data"
os.makedirs(DATA_FOLDER, exist_ok=True)

def save_to_file(content, filename):
    """ファイルにデータを保存"""
    filepath = os.path.join(DATA_FOLDER, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

def scrape_article_content(url):
    """指定されたURLのコンテンツをスクレイピング"""
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }

        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, "html.parser")

        # メインコンテンツを取得
        main_content = soup.find("article")
        if main_content:
            return " ".join(p.get_text() for p in main_content.find_all(["p", "div", "span"]))

        # それ以外の段落も取得（フォールバック）
        paragraphs = soup.find_all("p")
        return " ".join(p.get_text() for p in paragraphs)
    except requests.exceptions.RequestException as req_err:
        print(f"[ERROR] Request error for {url}: {req_err}")
        return None
    except Exception as e:
        print(f"[ERROR] An unexpected error occurred while scraping {url}: {e}")
        return None
