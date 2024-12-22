from flask import Blueprint, request, jsonify
import json
from services.utils import save_to_file
from services.openai_api import generate_blog_content
from services.post_to_wordpress import post_to_wordpress
from services.pipeline_utils import blog_workflow

pipeline_bp = Blueprint('pipeline', __name__)

@pipeline_bp.route('/run_pipeline', methods=['POST'])
def run_pipeline():
    data = request.json
    topic = data.get('topic')
    urls = data.get('urls', [])  # [{ "url": "http://example.com", "content": "..." }, ...]

    try:
        collected_content_dict = {entry['url']: entry['content'] for entry in urls if 'content' in entry}

        collected_content = "\n\n".join(
            [f"URL: {url}\n{content}" for url, content in collected_content_dict.items()]
        )
        save_to_file(collected_content, "collected_content_by_url.txt")

        final_blog, status_log = blog_workflow(topic, collected_content)

        post_to_wordpress(f"{topic} - Blog", final_blog)

        return jsonify({
            "message": "Pipeline executed successfully",
            "generated_blog": final_blog,
            "status_log": status_log
        })

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
