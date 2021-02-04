from .db import db
from .user import User


class Session(db.Model):
    __tablename__ = 'sessions'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    GPSLocation = db.Column(db.String(100))
    weather = db.Column(db.String(255))
    localTime = db.Column(db.DateTime)
    createTime = db.Column(db.DateTime)

    user = db.relationship('User', backref=db.backref('sessions'))

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "GPSLocation": self.GPSLocation,
            "weather": self.weather,
            "localtime": self.localTime
        }
