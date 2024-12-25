import os
from dotenv import load_dotenv

# 環境変数の読み込み
load_dotenv()

class Config:
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    NEWS_API_KEY = os.getenv('NEWS_API_KEY')
    BING_API_KEY = os.getenv('BING_API_KEY')
    WP_URL = os.getenv('WP_URL')
    WP_USER = os.getenv('WP_USER')
    WP_APP_PASSWORD = os.getenv('WP_APP_PASSWORD')
