from flask import Blueprint, jsonify, request
import uuid

from app.models import db, Talk

talk_routes = Blueprint("talk", __name__)


@talk_routes.route("/<int:id>/pull", methods=["GET"])
def pull_talk_data():
    return None


@talk_routes.route("/<int:id>/push", methods=["POST"])
def push_talk_data():
    return None


@talk_routes.route("/join", methods=["POST"])
def join():
    print("I am here!")
    return None


@talk_routes.route("/create", methods=["POST"])
def create_talk():
    json = request.json

    uniqueIdentifier = uuid.uuid4().int

    talk = Talk(
        initiatorCompassDirection=json["initiatorCompassDirection"],
        initiatorGPSLatitude=json["initiatorGPSLatitude"],
        initiatorGPSLongitude=json["initiatorGPSLongitude"],
        initiatorUserId=int(json["initiatorUserId"]),
        uniqueIdentifier=uniqueIdentifier,
    )

    db.session.add(talk)
    db.session.commit()

    return jsonify(str(uniqueIdentifier))
