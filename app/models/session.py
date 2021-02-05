from datetime import datetime

from .db import db
from .user import User


class Session(db.Model):
    __tablename__ = "sessions"

    id = db.Column(db.Integer, primary_key=True)
    createdWhen = db.Column(db.DateTime, default=datetime.utcnow)
    updatedWhen = db.Column(db.DateTime, default=datetime.utcnow)
    localTimezone = db.Column(db.DateTime)
    GPSLatitude = db.Column(db.String(100))
    GPSLongitude = db.Column(db.String(100))
    userId = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    temperatureFahrenheit = db.Column(db.Integer)
    temperatureFeelsLikeFahrenheit = db.Column(db.Integer)
    weatherDescription = db.Column(db.String(50))

    user = db.relationship("User", backref=db.backref("sessions"))

    def to_dict(self):
        return {
            "id": self.id,
            "localTimezone": self.localTimezone,
            "GPSLatitude": self.GPSLatitude,
            "GPSLongitude": self.GPSLongitude,
            "temperatureFahrenheit": self.temperatureFahrenheit,
            "temperatureFeelsLikeFahrenheit": self.temperatureFeelsLikeFahrenheit,
            "userId": self.userId,
            "weatherDescription": self.weatherDescription,
        }
