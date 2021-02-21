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

    db.session.commit()

    return jsonify(str(lock))


@lock_routes.route("/join", methods=["POST"])
def join():
    json = request.json

    print(json)

    lock = Lock.query.filter_by(uniqueIdentifier=json["uniqueIdentifier"]).first()

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
