from flask import Blueprint, request
import requests

from app.models import db, Locale

locale_routes = Blueprint("locale", __name__)


@locale_routes.route("/", methods=["GET"])
def get_locale():
    return "hi"


@locale_routes.route("/", methods=["POST"])
def make_locale():
    json = request.json

    sun_response = requests.get(
        f'https://api.sunrise-sunset.org/json?lat={json["GPSLatitude"]}&lng={json["GPSLongitude"]}'
    )
    sunrise = sun_response["sunrise"]
    sunset = sun_response["sunset"]

    weather_response = requests.get(
        f'https://api.openweathermap.org/data/2.5/weather?lat={json["GPSLatitude"]}&lon={json["GPSLongitude"]}&units=imperial&appid=f0f94586ed73f88a8afda092075a65a0'
    )
    feels_like = weather_response["main"]["feels_like"]
    temp = weather_response["main"]["temp"]
    weatherDescription = weather_response["weather"][0]["main"]
    weatherDescriptionDetailed = weather_response["weather"][0]["description"]
    # wind_deg = response["wind"]["deg"]
    # wind_speed = response["wind"]["speed"]

    locale = Locale(
        GPSLatitude=json["GPSLatitude"],
        GPSLongitude=json["GPSLongitude"],
        localTimezoneOffset=json["localTimezoneOffset"],
        sunrise=sunrise,
        sunset=sunset,
        temperatureFahrenheit=temp,
        temperatureFahrenheitFeelsLikeFahrenheit=feels_like,
        userId=json["userId"],
        weatherDescription=weatherDescription,
        weatherDescriptionDetailed=weatherDescriptionDetailed,
    )

    db.locale.add(locale)
    db.locale.commit()

    return locale.to_dict()