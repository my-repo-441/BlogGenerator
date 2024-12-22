from openai import OpenAI
from config import Config

client = OpenAI()

# OpenAI APIキーの設定
OPENAI_API_KEY = Config.OPENAI_API_KEY

def generate_blog_content(topic, collected_info, is_continuation=False):
    """
    ブログ記事を生成または続きの生成を行う関数。
    """
    if is_continuation:
        system_message = "以下の記事内容の続きを作成してください。"
    else:
        # system_message = "以下の情報をもとに、ブログ記事を作成してください。"
        # system_message = "以下の情報をもとに、ブログ記事を作成してください。「くれとむ」と「チーズくん」という二人のキャラクターによる掛け合いをリード文に含めて欲しい。IT技術系のブログは、「使ってみた」などの独自性に溢れる記事の内容にしてほしい。"
        system_message = "以下の情報をもとに、HTML形式でブログ記事を作成してください。「くれとむ」と「チーズくん」という二人のキャラクターによる掛け合いをリード文に含めて欲しい。IT技術系のブログは、「使ってみた」などの独自性に溢れる記事の内容にしてほしい。"
    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": f"トピック: {topic}\n内容: {collected_info}"}
    ]

    try:
        response = client.chat.completions.create(
         model="gpt-4o-mini",
         messages=messages,
            max_tokens=1500
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
