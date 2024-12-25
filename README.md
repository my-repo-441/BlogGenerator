
# AI対応のブログコンテンツ生成パイプライン

このプロジェクトは、AIサービスとウェブスクレイピング技術を活用して、ブログ投稿の作成と公開プロセスを自動化するAI対応のブログコンテンツ生成パイプラインです。

アプリケーションはFlaskベースのバックエンドAPIとReactベースのフロントエンドで構成されています。OpenAIのGPTモデル、Bing Search API、WordPress統合を活用して、コンテンツ作成プロセスを効率化します。

## リポジトリ構成

```
.
├── backend/
│   ├── app.py                 # メインFlaskアプリケーションエントリーポイント
│   ├── blueprints/            # APIルート定義
│   ├── config.py              # 設定ファイル
│   ├── data/                  # 保存されたデータ（例：スクレイピング結果）
│   └── services/              # コア機能の実装
├── frontend/
│   ├── index.html             # メインHTMLファイル
│   ├── package.json           # フロントエンド依存関係とスクリプト
│   ├── src/                   # Reactアプリケーションのソースコード
│   │   ├── App.jsx            # メインReactコンポーネント
│   │   ├── components/        # 再利用可能なReactコンポーネント
│   │   ├── pages/             # ページ単位のReactコンポーネント
│   │   └── styles/            # CSSスタイルシート
│   └── vite.config.js         # 開発用のVite設定
└── README.md
```

## 使用方法

### 前提条件

- Python 3.7以上
- Node.js 14以上
- OpenAI APIキー
- Bing Search APIキー
- APIアクセス可能なWordPressサイト

### バックエンドのセットアップ

1. `backend`ディレクトリに移動します。
   ```
   cd backend
   ```

2. 仮想環境を作成します。
   ```
   python -m venv venv
   source venv/bin/activate  # Windowsの場合は `venv\Scripts\activate`
   ```

3. 必要なパッケージをインストールします。
   ```
   pip install -r requirements.txt
   ```

4. `backend`ディレクトリに`.env`ファイルを作成し、以下を記載します。
   ```
   OPENAI_API_KEY=your_openai_api_key
   BING_API_KEY=your_bing_api_key
   WP_URL=your_wordpress_site_url
   WP_USER=your_wordpress_username
   WP_APP_PASSWORD=your_wordpress_app_password
   ```

5. Flaskアプリケーションを起動します。
   ```
   python app.py
   ```

### フロントエンドのセットアップ

1. `frontend`ディレクトリに移動します。
   ```
   cd frontend
   ```

2. 必要なパッケージをインストールします。
   ```
   npm install
   ```

3. 開発サーバーを起動します。
   ```
   npm run dev
   ```

### アプリケーションの利用

1. ブラウザで`http://localhost:5173`（またはViteが提供するURL）にアクセスします。
2. ナビゲーションメニューを使用して、各種機能にアクセスします。
   - ホーム: アプリケーションの概要
   - コンテンツ取得: 指定されたトピックに基づくコンテンツの検索とスクレイピング
   - ブログ生成: 取得したコンテンツとAI生成テキストを使用したブログ投稿の作成

## データフロー

アプリケーションは以下のデータフローに従います。

1. ユーザーがフロントエンドでトピックを入力します。
2. フロントエンドがバックエンドAPIにリクエストを送信します。
3. バックエンドがBing Search APIを使用して関連する記事を検索します。
4. バックエンドが許可されたURLからコンテンツをスクレイピングします。
5. OpenAIのGPTモデルがスクレイピングデータを元にブログコンテンツを生成します。
6. 生成されたコンテンツがWordPressにAPI経由で投稿されます。
7. 結果がフロントエンドに返され、表示されます。

```
[ユーザー] -> [フロントエンド] -> [バックエンドAPI] -> [Bing Search API]
                                             -> [Webスクレイピング]
                                             -> [OpenAI API]
                                             -> [WordPress API]
          [フロントエンド] <- [バックエンドAPI] <- [結果]
```

## トラブルシューティング

### よくある問題

1. **APIキーの問題**
   - 問題: 「無効なAPIキー」または「認証エラー」
   - 解決策: `.env`ファイルのAPIキーを再確認してください。

2. **CORSエラー**
   - 問題: ブラウザコンソールに「Access-Control-Allow-Origin」エラー
   - 解決策: `app.py`のFlask CORS設定と`vite.config.js`のプロキシ設定を確認してください。

3. **スクレイピング失敗**
   - 問題: 「コンテンツをスクレイピングできません」または結果が空
   - 解決策: 対象サイトの`robots.txt`を確認し、スクレイピングポリシーを遵守してください。

### デバッグ

Flaskバックエンドでデバッグモードを有効にするには：

1. `FLASK_ENV`環境変数を設定します。
   ```
   export FLASK_ENV=development
   ```
2. Flaskアプリケーションをデバッグモードで実行します。
   ```
   python app.py
   ```

フロントエンドのデバッグ：

1. ブラウザの開発者ツール（F12）を使用してネットワークリクエストやコンソール出力を確認します。
2. Chrome DevToolsの「ソース」タブでReactコンポーネントにブレークポイントを設定します。

ログファイルは以下で確認できます：
- **バックエンド**: `python app.py`を実行したコンソール出力
- **フロントエンド**: ブラウザコンソールおよび`npm run dev`を実行したターミナル

## パフォーマンス最適化

パフォーマンスを向上させるために：

1. PostmanやブラウザのDevToolsのネットワークタブを使用してAPI応答時間を監視します。
2. 頻繁にアクセスされるデータ（スクレイピング結果やAPI応答）にキャッシュを導入します。
3. 大量のデータセットにはページネーションを実装してロード時間を短縮します。
4. タスクキュー（例: Celery）を使用してコンテンツ生成のような長時間実行操作を処理します。
