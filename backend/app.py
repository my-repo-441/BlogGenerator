from flask import Flask
from flask_cors import CORS
from blueprints.bing_blueprint import bing_bp
from blueprints.content_blueprint import content_bp
from blueprints.pipeline_blueprint import pipeline_bp
from blueprints.twitter_blueprint import twitter_bp
from blueprints.improve_blog_blueprint import improve_blog_bp

# Flaskアプリの初期化
app = Flask(__name__)
CORS(app, supports_credentials=True)

# Blueprintの登録
app.register_blueprint(bing_bp, url_prefix='/api')
app.register_blueprint(content_bp, url_prefix='/api')
app.register_blueprint(pipeline_bp, url_prefix='/api')
app.register_blueprint(twitter_bp, url_prefix='/api')
app.register_blueprint(improve_blog_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
