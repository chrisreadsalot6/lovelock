from flask import Blueprint, jsonify, request
import requests
import uuid

from app.models import db, Lock
from app.api.locale_routes import make_locale

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

    return jsonify(responseData)


@lock_routes.route("/<int:lockId>/push-compass", methods=["POST"])
def push_compass_data(lockId):
    json = request.json

    lock = Lock.query.filter_by(uniqueIdentifier=lockId).first()

    # breaks on page refresh, without going back to the link page
    if json["initiatorOrJoiner"] == "initiator":
        lock.initiatorCompassDirection = json["compassDirection"]
        lock.initiatorLocked = json["locked"]
    else:
        lock.joinerCompassDirection = json["compassDirection"]
        lock.joinerLocked = json["locked"]

    if json["midwayGPSLatitude"]:
        lock.midwayGPSLatitude = json["midwayGPSLatitude"]
        lock.midwayGPSLongitude = json["midwayGPSLongitude"]

    db.session.commit()

    return jsonify(lock.to_dict())


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


@lock_routes.route("/join", methods=["POST"])
def join_lock():
    json = request.json
    code = json["uniqueIdentifier"]

    seedObject = {
        # Willard Beach
        "04106": {
            "initiatorGPSLatitude": "43.642398",
            "initiatorGPSLongitude": "-70.227022",
        },
        # Joe
        "09": {
            "initiatorGPSLatitude": "40.705899",
            "initiatorGPSLongitude": "-74.043770",
        },
        # Mecca
        "570": {
            "initiatorGPSLatitude": "21.422487",
            "initiatorGPSLongitude": "39.826206",
        },
        # Harvard Yard
        "1636": {
            "initiatorGPSLatitude": "42.374394",
            "initiatorGPSLongitude": "-71.116257",
        },
        # The White House
        "1776": {
            "initiatorGPSLatitude": "38.897957",
            "initiatorGPSLongitude": "-77.036560",
        },
        # Stephen Colbert
        "1997": {
            "initiatorGPSLatitude": "40.763771",
            "initiatorGPSLongitude": "-73.983040",
        },
        # Sphinx
        "12000": {
            "initiatorGPSLatitude": "29.971829446",
            "initiatorGPSLongitude": "31.13583279",
        },
    }

    lock = None
    if code in seedObject.keys():
        initiatorCompassDirection = 100
        initiatorGPSLatitude = seedObject[code]["initiatorGPSLatitude"]
        initiatorGPSLongitude = seedObject[code]["initiatorGPSLongitude"]
        initiatorUserId = 1
        uniqueIdentifier = uuid.uuid4().int

        lock = Lock(
            initiatorCompassDirection=initiatorCompassDirection,
            initiatorGPSLatitude=initiatorGPSLatitude,
            initiatorGPSLongitude=initiatorGPSLongitude,
            initiatorUserId=initiatorUserId,
            uniqueIdentifier=uniqueIdentifier,
        )

        postData = {
            "localTimezoneOffset": None,
            "GPSLatitude": initiatorGPSLatitude,
            "GPSLongitude": initiatorGPSLongitude,
            "name": "saved_place",
            "userId": json["joinerUserId"],
        }

        make_locale(postData)

    else:
        lock = Lock.query.filter_by(uniqueIdentifier=code).first()

    if not lock:
        return jsonify(False)
    else:
        lock.active = True
        lock.joinerCompassDirection = json["joinerCompassDirection"]
        lock.joinerGPSLatitude = json["joinerGPSLatitude"]
        lock.joinerGPSLongitude = json["joinerGPSLongitude"]
        lock.joinerUserId = json["joinerUserId"]

        db.session.add(lock)  # ?? will this mess up create??
        db.session.commit()

        return jsonify(lock.to_dict())
