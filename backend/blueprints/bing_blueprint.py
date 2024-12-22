from flask import Blueprint, request, jsonify
import json
from services.bing_search_api import fetch_bing_articles
from services.utils import save_to_file

bing_bp = Blueprint('bing', __name__)

@bing_bp.route('/fetch_bing_articles', methods=['GET'])
def get_bing_articles():
    keyword = request.args.get('keyword')
    count = request.args.get('count', default=3, type=int)

    try:
        articles = fetch_bing_articles(keyword, count)
        save_to_file(json.dumps(articles, indent=4, ensure_ascii=False), "bing_articles.json")
        return jsonify(articles)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
