from flask import Blueprint, request

from app.models import db, Session

session_routes = Blueprint("session", __name__)


@session_routes.route("/", methods=["GET"])
def get_session():
    return "hi"


@session_routes.route("/", methods=["POST"])
def make_session():
    json = request.json
    
    session = Session(
        localTimezoneOffset=json["localTimezoneOffset"],
        GPSLatitude=json["GPSLatitude"],
        GPSLongitude=json["GPSLongitude"],
        userId=json["userId"],
    )

    db.session.add(session)
    db.session.commit()

    return session.to_dict()