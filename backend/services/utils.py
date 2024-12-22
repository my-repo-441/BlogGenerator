import os
import requests
from bs4 import BeautifulSoup

DATA_FOLDER = "./data"
os.makedirs(DATA_FOLDER, exist_ok=True)

def save_to_file(content, filename):
    filepath = os.path.join(DATA_FOLDER, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

def scrape_article_content(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, "html.parser")
        main_content = soup.find("article")
        if main_content:
            return " ".join(p.get_text() for p in main_content.find_all(["p", "div", "span"]))
        paragraphs = soup.find_all("p")
        return " ".join(p.get_text() for p in paragraphs)
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return None
