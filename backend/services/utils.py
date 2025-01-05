import os
import requests
from bs4 import BeautifulSoup

# デフォルトのデータ保存フォルダ
DATA_FOLDER = "./data"
os.makedirs(DATA_FOLDER, exist_ok=True)

def save_to_file(content, filename, folder=DATA_FOLDER):
    """
    Save content to a file.

    Args:
        content (str): Content to save.
        filename (str): Name of the file.
        folder (str): Directory to save the file (default: DATA_FOLDER).
    """
    filepath = os.path.join(folder, filename)
    os.makedirs(folder, exist_ok=True)  # フォルダが存在しない場合は作成
    try:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"File saved successfully: {filepath}")
    except Exception as e:
        print(f"[ERROR] Failed to save file {filename}: {e}")

def scrape_article_content(url):
    """
    Scrape the main content from the given URL.

    Args:
        url (str): The URL of the article to scrape.

    Returns:
        str: Scraped content as a single string, or None if scraping fails.
    """
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }

        response = requests.get(url, headers=headers, timeout=20)
        response.raise_for_status()  # ステータスコードが200以外の場合、例外を発生

        soup = BeautifulSoup(response.content, "html.parser")

        # メイン記事を <article> タグから取得
        main_content = soup.find("article")
        if main_content:
            return " ".join(p.get_text() for p in main_content.find_all(["p", "div", "span"]))

        # フォールバックとしてすべての段落を取得
        paragraphs = soup.find_all("p")
        if paragraphs:
            return " ".join(p.get_text() for p in paragraphs)

        # コンテンツが見つからなかった場合
        print(f"[WARNING] No content found for URL: {url}")
        return None

    except requests.exceptions.RequestException as req_err:
        print(f"[ERROR] Request error for {url}: {req_err}")
        return None
    except Exception as e:
        print(f"[ERROR] Unexpected error while scraping {url}: {e}")
        return None
