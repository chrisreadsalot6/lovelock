from flask import Blueprint, request
import uuid

from app.models import Conversation

talk_routes = Blueprint("talk", __name__)


@talk_routes.route("/<int:id>/pull", methods=["GET"])
def pull_talk_data():
    return Conversation


@talk_routes.route("/<int:id>/push", methods=["POST"])
def push_talk_data():
    return Conversation


@talk_routes.route("/join", methods=["POST"])
def join():
    return Conversation


@talk_routes.route("/new", methods=["POST"])
def create_talk():
    json = request.json

    print(json)
    #   initiatorCompassDirection: event.webkitCompassHeading,
    #   initiatorGPSLatitude: coords.latitude,
    #   initiatorGPSLongitude: coords.longitude,
    #   initiatorUserId: userId

    uniqueId = uuid.uuid4().int

    return "hi"

    # return Conversation