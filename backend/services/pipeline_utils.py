import os
from services.openai_api import generate_blog_content

DATA_FOLDER = "./data"
os.makedirs(DATA_FOLDER, exist_ok=True)

# ファイルにデータを保存するユーティリティ関数
def save_to_file(content, filename):
    filepath = os.path.join(DATA_FOLDER, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

# ブログ生成とブラッシュアップの処理
def blog_workflow(topic, collected_content, target_length=20000):
    save_to_file(collected_content, "initial_collected_content.txt")

    current_content = generate_blog_content(topic, collected_content)
    total_content = current_content
    total_length = len(total_content)
    iteration = 1
    max_iterations = 1  # 必要に応じて調整
    improvement_iteration = 1
    status_log = []

    save_to_file(current_content, f"blog_iteration_{iteration}_initial.txt")
    status_log.append(f"Iteration {iteration}, Initial Content: {len(current_content)} characters")

    while total_length < target_length and iteration <= max_iterations:
        for i in range(improvement_iteration):  # 数回のブラッシュアップ
            total_content = generate_blog_content(topic, total_content, is_continuation=False, is_improvement=True)
            save_to_file(current_content, f"blog_iteration_{iteration}_revision_{i+1}.txt")
            status_log.append(f"Iteration {iteration}, Revision {i+1}: {len(total_content)} characters")

        continuation_content = generate_blog_content(topic, total_content, is_continuation=True, is_improvement=False)
        total_content += "\n" + continuation_content
        save_to_file(total_content, f"blog_iteration_{iteration}_continuation.txt")
        total_length = len(total_content)
        status_log.append(f"Iteration {iteration}, Continuation: {len(total_content)} characters")
        iteration += 1

    save_to_file(total_content, "final_blog.txt")
    save_to_file("\n".join(status_log), "workflow_status_log.txt")
    return total_content, status_log
