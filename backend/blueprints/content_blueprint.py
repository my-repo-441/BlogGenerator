from flask import Blueprint, request, jsonify
import json
from services.can_scrape import can_scrape
from services.utils import save_to_file, scrape_article_content

content_bp = Blueprint('content', __name__)

@content_bp.route('/scrape_content', methods=['POST'])
def scrape_content():
    try:
        data = request.json
        if not data or 'urls' not in data:
            return jsonify({"error": "URLs are required"}), 400

        urls = data['urls']
        results = []

        for url in urls:
            result = {"url": url}
            try:
                if not can_scrape(url):
                    result["status"] = "disallowedByRobotsTxt"
                else:
                    scraped_content = scrape_article_content(url)
                    result["status"] = "success" if scraped_content else "noContent"
                    result["content"] = scraped_content
            except Exception as e:
                result["status"] = "error"
                result["error"] = str(e)
            results.append(result)

        save_to_file(json.dumps(results, indent=4, ensure_ascii=False), "scraped_results.json")
        return jsonify({"results": results})
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
