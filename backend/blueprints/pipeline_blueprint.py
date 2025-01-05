from flask import Blueprint, request, jsonify
from services.utils import save_to_file, scrape_article_content
from services.openai_api import generate_blog_content
from services.post_to_wordpress import post_to_wordpress
from services.pipeline_utils import blog_workflow

pipeline_bp = Blueprint('pipeline', __name__)

@pipeline_bp.route('/run_pipeline', methods=['POST'])
def run_pipeline():
    """
    Blog generation pipeline that:
    1. Collects content from URLs.
    2. Generates a blog using OpenAI.
    3. Posts the blog to WordPress.
    """
    data = request.json
    title = data.get('title')
    blog_keywords = data.get('blogKeywords')
    urls = data.get('urls', [])  # [{ "url": "http://example.com", "content": "..." }, ...]

    if not title or not blog_keywords or not urls:
        return jsonify({"error": "Title, keywords, and URLs are required"}), 400

    try:
        # Collect content from URLs
        collected_content_dict = {}
        for entry in urls:
            if 'content' in entry:
                collected_content_dict[entry['url']] = entry['content']
            else:
                scraped_content = scrape_article_content(entry['url'])
                if scraped_content:
                    collected_content_dict[entry['url']] = scraped_content

        collected_content = "\n\n".join(
            [f"URL: {url}\n{content}" for url, content in collected_content_dict.items()]
        )
        save_to_file(collected_content, "collected_content_by_url.txt")

        # Generate blog content
        final_blog, status_log = blog_workflow(title=title, collected_content=collected_content, blog_keywords=blog_keywords)

        # Save blog and status log
        save_to_file(final_blog, "final_blog.txt")
        save_to_file("\n".join(status_log), "workflow_status_log.txt")

        # Post to WordPress
        post_to_wordpress(title, final_blog)

        return jsonify({
            "message": "Pipeline executed successfully",
            "generated_blog": final_blog,
            "status_log": status_log
        })

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
