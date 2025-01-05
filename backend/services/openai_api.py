from openai import OpenAI
from config import Config

client = OpenAI()

# OpenAI APIキーの設定
OPENAI_API_KEY = Config.OPENAI_API_KEY

def generate_blog_content(title, blog_keywords, collected_info, is_continuation=False, is_improvement=False):
    print(f"title:{title}, keywords:{blog_keywords}")
    """
    ブログ記事を生成または続きの生成を行う関数。
    """
    if is_continuation:
        system_message = "以下の記事内容の続きを作成してください。"
        user_content = f"トピック: {title}\n内容: {collected_info}"
    elif is_improvement:
        system_message = "以下の記事内容を改善してください。"
        user_content = collected_info
    else:
        system_message = (
            "以下の情報をもとに、ブログ記事を作成してください。"
            "「くれとむ」と「チーズくん」という二人のキャラクターによる掛け合いをリード文に含めて欲しい。"
            f"次のキーワードに関連するブログ記事にしてほしい。{blog_keywords}"
        )
        user_content = f"トピック: {title}\n内容: {collected_info}"

    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": user_content},
    ]


    try:
        response = client.chat.completions.create(
         model="gpt-4o-mini",
         messages=messages,
            # max_tokens=1500
        )
    except Exception as e:
        print(f"Error generating blog content: {e}")
        
        return "エラーが発生しました。内容を生成できませんでした。"


    return response.choices[0].message.content.strip()


def generate_twitter_post(content):
    """
    Generate a concise and engaging Twitter post based on the given content.
    """
    system_message = (
        f"Create a concise and engaging Twitter post based on the following content:\n\n{content}\n\n"
        "The post should be professional, clear, and within 280 characters."
    )
    user_content = "内容"

    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": user_content},
    ]

    try:
        response = client.chat.completions.create(
         model="gpt-4o-mini",
         messages=messages,
        )

    except Exception as e:
        print(f"Error generating blog content: {e}")
        
        return "エラーが発生しました。内容を生成できませんでした。"
    
    return response.choices[0].message.content.strip()

def improve_blog_content(content):
    """
    Improve the given blog content using OpenAI.
    """
    system_message = (
        f"Improve the following blog content:\n\n{content}\n\n"
        "Make it more engaging, clear, and professional while retaining its original meaning."
    )

    user_content = "内容"

    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": user_content},
    ]

    try:
        response = client.chat.completions.create(
         model="gpt-4o-mini",
         messages=messages,
        )

    except Exception as e:
        print(f"Error generating blog content: {e}")
        
        return "エラーが発生しました。内容を生成できませんでした。"
    
    return response.choices[0].message.content.strip()


def generate_blog_img(title):
    response_img = client.images.generate(
      model="dall-e-3",
      prompt = title,
      size="1024x1024",
      quality="standard",
      n=1,
    )

    image_url = response_img.data[0].url
    return image_url
