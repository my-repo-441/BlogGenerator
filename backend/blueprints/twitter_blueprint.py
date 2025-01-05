from flask import Blueprint, request, jsonify
from services.utils import scrape_article_content
from services.openai_api import generate_twitter_post
import logging
import traceback

twitter_bp = Blueprint('twitter', __name__)

@twitter_bp.route('/generate_twitter_content', methods=['POST'])
def generate_twitter_content():
    """
    Generate a Twitter post from the content of a provided URL.
    """
    data = request.get_json()
    url = data.get('url')

    if not url:
        return jsonify({"error": "URL is required"}), 400

    try:
        # Scrape content from the URL
        content = scrape_article_content(url)
        if not content:
            return jsonify({"error": "Failed to scrape content from the provided URL"}), 400

        # Generate Twitter post using OpenAI
        twitter_post = generate_twitter_post(content)

        return jsonify({
            "message": "Twitter post generated successfully",
            "twitter_post": twitter_post
        }), 200

    except Exception as e:
        logging.error(f"An error occurred while generating the Twitter post: {traceback.format_exc()}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
