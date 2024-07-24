import os
from flask import Flask, request, redirect, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
import traceback

from .models import db, User
from .api.auth_routes import auth_routes
from .api.lock_routes import lock_routes
from .api.locale_routes import locale_routes
from .seeds import seed_commands
from .config import Config

app = Flask(__name__)

# Application Security
CORS(app, resources={r"/api/*": {
    "origins": "http://localhost:3000",
    "supports_credentials": True,
    "allow_headers": ["Content-Type", "X-CSRFToken"],
    "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}})

# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........

# CSRF Protection
csrf = CSRFProtect()
csrf.init_app(app)
app.config['WTF_CSRF_ENABLED'] = True
# Configure CSRF protection to check for the token in headers
app.config['WTF_CSRF_CHECK_DEFAULT'] = False
app.config['WTF_CSRF_HEADERS'] = ['X-CSRFToken', 'X-CSRF-Token']

app.config['SECRET_KEY'] = 'your-secret-key'

# Setup login manager
login = LoginManager(app)
login.login_view = "auth.unauthorized"

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)

@app.before_request
def before_request():
    # Log the headers and CSRF token for debugging
    print('Headers: %s', request.headers)
    print('CSRF token in header: %s', request.headers.get('X-CSRFToken'))
    
    # HTTPS redirect
    if os.environ.get("FLASK_ENV") == "production":
        if request.headers.get("X-Forwarded-Proto") == "http":
            url = request.url.replace("http://", "https://", 1)
            code = 301
            return redirect(url, code=code)
    # Handle preflight requests
    if request.method == "OPTIONS":
        return jsonify({"message": "OK"}), 200
    

@app.after_request
def after_request(response):
    # inject csrf token
    response.set_cookie(
        "csrf_token",
        generate_csrf(),
        secure=True if os.environ.get("FLASK_ENV") == "production" else False,
        samesite="Strict" if os.environ.get("FLASK_ENV") == "production" else None,
        httponly=True,
    )

    # for cors error
    # response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

@app.errorhandler(400)
def bad_request_error(error):
    app.logger.error(f"Bad Request: {error}")
    app.logger.error(traceback.format_exc())
    return jsonify(error=str(error)), 400

# Register Blueprints
app.register_blueprint(auth_routes, url_prefix="/api/auth")
app.register_blueprint(lock_routes, url_prefix="/api/lock")
app.register_blueprint(locale_routes, url_prefix="/api/locale")

# Endpoint to fetch CSRF token
@app.route("/api/csrf-token", methods=["GET", "OPTIONS"])
def get_csrf_token():
    token = generate_csrf()
    print(f"CSRF token: {token}")
    response = jsonify({'csrf_token': token})
    response.set_cookie("csrf_token", token, httponly=True, samesite="Strict")
    return response

db.init_app(app)
Migrate(app, db)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def react_root(path):
    if path == "favicon.ico":
        return app.send_static_file("favicon.ico")
    return app.send_static_file("index.html")


if __name__ == "__main__":
    app.run(host='localhost', port=5001, debug=True)

# run over https
# app.run(ssl_context='adhoc')
