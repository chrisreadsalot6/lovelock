from datetime import datetime

from .db import db
from .user import User


class Session(db.Model):
    __tablename__ = "sessions"

    id = db.Column(db.Integer, primary_key=True)
    createdWhen = db.Column(db.DateTime, default=datetime.utcnow)
    updatedWhen = db.Column(db.DateTime, default=datetime.utcnow)
    GPSLatitude = db.Column(db.String(100))
    GPSLongitude = db.Column(db.String(100))
    localTimezoneOffset = db.Column(db.Integer)
    userId = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    temperatureFahrenheit = db.Column(db.Integer)
    temperatureFeelsLikeFahrenheit = db.Column(db.Integer)
    weatherDescription = db.Column(db.String(50))

    user = db.relationship("User", backref=db.backref("sessions"))

    def to_dict(self):
        return {
            "id": self.id,
            "GPSLatitude": self.GPSLatitude,
            "GPSLongitude": self.GPSLongitude,
            "localTimezoneOffset": self.localTimezoneOffset,
            "temperatureFahrenheit": self.temperatureFahrenheit,
            "temperatureFeelsLikeFahrenheit": self.temperatureFeelsLikeFahrenheit,
            "userId": self.userId,
            "weatherDescription": self.weatherDescription,
        }
