from flask import Blueprint, jsonify, request
import uuid

from app.models import db, Lock

lock_routes = Blueprint("lock", __name__)


@lock_routes.route("/<int:lockId>/get-geolocation", methods=["GET"])
def get_geolocation_data(lockId):
    lock = Lock.query.filter_by(uniqueIdentifier=lockId).first()

    responseData = {
        "initiatorUserId": lock.initiatorUserId,
        "initiatorGPSLatitude": str(lock.initiatorGPSLatitude),
        "initiatorGPSLongitude": str(lock.initiatorGPSLongitude),
        "joinerUserId": lock.joinerUserId,
        "joinerGPSLatitude": str(lock.joinerGPSLatitude),
        "joinerGPSLongitude": str(lock.joinerGPSLongitude),
    }

    return jsonify(responseData)


@lock_routes.route("/<int:lockId>/pull-compass", methods=["GET"])
def pull_compass_data(lockId):
    lock = Lock.query.filter_by(uniqueIdentifier=lockId).first()

    responseData = {
        "initiatorCompassDirection": str(lock.initiatorCompassDirection),
        "joinerCompassDirection": str(lock.joinerCompassDirection),
    }

    print("pull-compass route", responseData)

    return jsonify(responseData)


@lock_routes.route("/<int:lockId>/push-compass", methods=["POST"])
def push_compass_data(lockId):
    json = request.json

    lock = Lock.query.filter_by(uniqueIdentifier=lockId).first()

    print("push-compass", json)

    if json["initiatorOrJoiner"] == "initiator":
        lock.initiatorCompassDirection = json["compassDirection"]
    else:
        lock.joinerCompassDirection = json["compassDirection"]

    if json["midwayGPSLatitude"]:
        lock.midwayGPSLatitude = json["midwayGPSLatitude"]
        lock.midwayGPSLongitude = json["midwayGPSLongitude"]

    db.session.commit()

    return jsonify(str(lock))


@lock_routes.route("/join", methods=["POST"])
def join_lock():
    json = request.json
    code = json["uniqueIdentifier"]

    if code in seedObject.keys():
        seedObject = {
            "570": {
                "initiatorGPSLatitude": "21.422487",
                "initiatorGPSLongitude": "39.826206"",
            },
            "1636": {
                "initiatorGPSLatitude": "42.374394",
                "initiatorGPSLongitude": "-71.116257",
            },
            "1776": {
                "initiatorGPSLatitude": "38.897957",
                "initiatorGPSLongitude": "-77.036560",
            },
            "1997": {
                "initiatorGPSLatitude": "40.763771",
                "initiatorGPSLongitude": "-73.983040",
            },
            "12000": {
                "initiatorGPSLatitude": "29.971829446",
                "initiatorGPSLongitude": "31.13583279",
            },
        }

        initiatorCompassDirection = 100
        initiatorGPSLatitude = seedObject["code"]["initiatorGPSLatitude"]
        initiatorGPSLongitude = seedObject["code"]["initiatorGPSLongitude"]
        initiatorUserId = 1
        uniqueIdentifier = uuid.uuid4().int

        lock = Lock(
            initiatorCompassDirection=initiatorCompassDirection,
            initiatorGPSLatitude=initiatorGPSLatitude,
            initiatorGPSLongitude=initiatorGPSLongitude,
            initiatorUserId=initiatorUserId,
            uniqueIdentifier=uniqueIdentifier,
        )
    else:
        lock = Lock.query.filter_by(uniqueIdentifier=code).first()

    lock.active = True
    lock.joinerCompassDirection = json["joinerCompassDirection"]
    lock.joinerGPSLatitude = json["joinerGPSLatitude"]
    lock.joinerGPSLongitude = json["joinerGPSLongitude"]
    lock.joinerUserId = json["joinerUserId"]

    db.session.commit()

    return jsonify(str(lock))


@lock_routes.route("/create", methods=["POST"])
def create_lock():
    json = request.json

    uniqueIdentifier = uuid.uuid4().int

    lock = Lock(
        initiatorCompassDirection=json["initiatorCompassDirection"],
        initiatorGPSLatitude=json["initiatorGPSLatitude"],
        initiatorGPSLongitude=json["initiatorGPSLongitude"],
        initiatorUserId=int(json["initiatorUserId"]),
        uniqueIdentifier=uniqueIdentifier,
    )

    db.session.add(lock)
    db.session.commit()

    return jsonify(str(uniqueIdentifier))
