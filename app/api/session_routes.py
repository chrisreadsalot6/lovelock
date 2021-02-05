from flask import Blueprint

from app.models import Session

session_routes = Blueprint("session", __name__)


@session_routes.route("/")
def make_session():
    # return session.to_dict()
    return "hi"
