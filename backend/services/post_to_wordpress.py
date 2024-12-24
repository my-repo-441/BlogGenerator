import requests
from requests.auth import HTTPBasicAuth

# def post_to_wordpress(title, content, image_url):
def post_to_wordpress(title, content):
    wp_url = ""
    wp_user = ""
    wp_app_password = ""

    # #画像をWordPressにアップロード
    # media_url = "https://www.kuretom.com/wp-json/wp/v2/media"
    # image_data = requests.get(image_url).content
    # headers = {"Content-Disposition": "attachment; filename=image.jpg"}
    # media_response = requests.post(
    #     media_url,
    #     headers=headers,
    #     data=image_data,
    #     auth=HTTPBasicAuth(wp_user, wp_app_password)
    # )

    # # ステータスコードを確認
    # if media_response.status_code != 201:
    #     print(f"画像アップロードに失敗しました: {media_response.status_code}")
    #     print(f"レスポンス内容: {media_response.text}")
    #     return  # 処理を終了


    # ブログ記事を投稿
    post_data = {
        "title": title[:10],
        "content": content,
        "status": "draft",  # 下書き状態
        # "featured_media": media_id  # サムネイル画像
    }
    response = requests.post(
        wp_url,
        json=post_data,
        auth=HTTPBasicAuth(wp_user, wp_app_password)
    )
    if response.status_code == 201:
        print(f"下書き投稿が成功しました: {response.json()['link']}")
    else:
        print(f"エラー: {response.status_code} - {response.text}")

