from flask import Blueprint, jsonify, request
import uuid

from app.models import db, Talk

talk_routes = Blueprint("talk", __name__)


@talk_routes.route("/<int:talkId>/get-geolocation", methods=["GET"])
def get_geolocation_data(talkId):
    talk = Talk.query.filter_by(uniqueIdentifier=talkId).first()

    responseData = {
        "initiatorUserId": talk.initiatorUserId,
        "initiatorGPSLatitude": str(talk.initiatorGPSLatitude),
        "initiatorGPSLongitude": str(talk.initiatorGPSLongitude),
        "joinerUserId": talk.joinerUserId,
        "joinerGPSLatitude": str(talk.joinerGPSLatitude),
        "joinerGPSLongitude": str(talk.joinerGPSLongitude),
    }

    return jsonify(responseData)


@talk_routes.route("/<int:talkId>/pull-compass", methods=["GET"])
def pull_compass_data(talkId):
    talk = Talk.query.filter_by(uniqueIdentifier=talkId).first()

    responseData = {
        "initiatorCompassDirection": str(talk.initiatorCompassDirection),
        "joinerCompassDirection": str(talk.joinerCompassDirection),
    }

    return jsonify(responseData)


@talk_routes.route("/<int:talkId>/push-compass", methods=["POST"])
def push_compass_data(talkId):
    json = request.json

    talk = Talk.query.filter_by(uniqueIdentifier=talkId).first()

    print(talk)

    if json["initiatorOrJoiner"] == "initiator":
        talk.initiatorCompassDirection = json["compassDirection"]
    else:
        talk.joinerCompassDirection = json["compassDirection"]

    db.session.commit()

    return jsonify(str(talk))


@talk_routes.route("/join", methods=["POST"])
def join():
    json = request.json

    talk = Talk.query.filter_by(uniqueIdentifier=json["uniqueIdentifier"]).first()

    talk.active = True
    talk.joinerCompassDirection = json["joinerCompassDirection"]
    talk.joinerGPSLatitude = json["joinerGPSLatitude"]
    talk.joinerGPSLongitude = json["joinerGPSLongitude"]
    talk.joinerUserId = json["joinerUserId"]

    db.session.commit()

    return jsonify(str(talk))


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
