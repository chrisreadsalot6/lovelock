from flask import Blueprint

from app.models import Conversation

link_routes = Blueprint("link", __name__)

# make a unique id: uuid.uuid4().int


@link_routes.route("/")
def link():
    return Conversation