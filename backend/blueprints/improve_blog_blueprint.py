from flask import Blueprint, request, jsonify
from services.utils import scrape_article_content
from services.openai_api import improve_blog_content
import logging
import traceback

improve_blog_bp = Blueprint('improve_blog', __name__)

@improve_blog_bp.route('/improve_blog_content', methods=['POST'])
def improve_blog_content_endpoint():
    """
    Improve the content of a blog article based on its URL.
    """
    data = request.get_json()
    url = data.get('url')

    if not url:
        return jsonify({"error": "URL is required"}), 400

    try:
        # Scrape the content from the provided URL
        content = scrape_article_content(url)
        if not content:
            return jsonify({"error": "Failed to scrape content from the provided URL"}), 400

        # Improve the content using OpenAI API
        improved_content = improve_blog_content(content)

        return jsonify({
            "message": "Content improved successfully",
            "improved_content": improved_content
        }), 200

    except Exception as e:
        logging.error(f"An error occurred while improving blog content: {traceback.format_exc()}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
