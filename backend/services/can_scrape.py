from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse

def can_scrape(url):
    """
    robots.txtを解析し、指定されたURLへのアクセスが許可されているか詳細に確認する。
    
    Parameters:
        url (str): 判定対象のURL

    Returns:
        bool: クローリングが許可されていればTrue、禁止されていればFalse。
    """
    parsed_url = urlparse(url)
    base_url = f"{parsed_url.scheme}://{parsed_url.netloc}"  # ルートURL
    robots_url = f"{base_url}/robots.txt"

    # robots.txtを解析
    rp = RobotFileParser()
    rp.set_url(robots_url)

    try:
        rp.read()
    except Exception as e:
        print(f"robots.txtの取得に失敗: {e}")
        return False  # robots.txtが取得できない場合は安全のため禁止とみなす

    # URLへのアクセス許可を全体で確認
    if not rp.can_fetch("*", url):
        return False

    # robots.txtの細かいパスルールを確認
    disallow_paths = []
    try:
        # RobotFileParserからDisallowパスを抽出
        entries = rp.entries
        for entry in entries:
            for rule in entry.rulelines:
                if not rule.allowance:  # Disallowの場合
                    disallow_paths.append(rule.path)
    except Exception as e:
        print(f"Disallowパスの取得に失敗: {e}")

    # URLがDisallowパスに一致するか判定
    for disallow_path in disallow_paths:
        if url.startswith(f"{base_url}{disallow_path}"):
            return False  # クローリング禁止

    return True

# 使用例
url = "https://example.com/some-page/"
if can_scrape(url):
    print("このページへのクローリングは許可されています")
else:
    print("このページへのクローリングは禁止されています")
