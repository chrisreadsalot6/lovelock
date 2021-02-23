from flask import Blueprint, request

from app.models import db, Locale

locale_routes = Blueprint("locale", __name__)


@locale_routes.route("/", methods=["GET"])
def get_locale():
    return "hi"


@locale_routes.route("/", methods=["POST"])
def make_locale():
    json = request.json

    locale = Locale(
        GPSLatitude=json["GPSLatitude"],
        GPSLongitude=json["GPSLongitude"],
        localTimezoneOffset=json["localTimezoneOffset"],
        userId=json["userId"],
    )

    db.locale.add(locale)
    db.locale.commit()

    return locale.to_dict()