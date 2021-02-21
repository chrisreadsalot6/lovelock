from datetime import datetime

from .db import db
from .user import User


class Lock(db.Model):
    __tablename__ = "talks"

    id = db.Column(db.Integer, primary_key=True)
    createdWhen = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updatedWhen = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    active = db.Column(db.Boolean, nullable=False, default=False)
    endedWhen = db.Column(db.DateTime)
    initiatorCompassDirection = db.Column(db.Numeric, nullable=False)
    initiatorGPSLatitude = db.Column(db.Numeric, nullable=False)
    initiatorGPSLongitude = db.Column(db.Numeric, nullable=False)
    initiatorUserId = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    joinerCompassDirection = db.Column(db.Numeric)
    joinerGPSLatitude = db.Column(db.Numeric)
    joinerGPSLongitude = db.Column(db.Numeric)
    joinerUserId = db.Column(db.Integer, db.ForeignKey(User.id))
    midwayGPSLatitude = db.Column(db.Numeric)
    midwayGPSLongitude = db.Column(db.Numeric)
    midwayPointCity = db.Column(db.String(100))
    startedWhen = db.Column(db.DateTime)
    uniqueIdentifier = db.Column(db.Numeric(40, 0), nullable=False)

    initiatorUser = db.relationship(
        "User", foreign_keys=[initiatorUserId], backref="initiator_talks"
    )
    joinerUser = db.relationship(
        "User", foreign_keys=[joinerUserId], backref="joiner_talks"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "createdWhen": self.createdWhen,
            "startedWhen": self.startedWhen,
            "endedWhen": self.endedWhen,
            "active": self.active,
            "initiatorCompassDirection": self.initiatorCompassDirection,
            "initiatorGPSLatitude": self.initiatorGPSLatitude,
            "initiatorGPSLongitude": self.initiatorGPSLongitude,
            "initiatorUserId": self.initiatorUserId,
            "joinerCompassDirection": self.joinerCompassDirection,
            "joinerGPSLatitude": self.joinerGPSLatitude,
            "joinerGPSLongitude": self.joinerGPSLongitude,
            "joinerUserId": self.joinerUserId,
            "midwayGPSLatitude": self.midwayGPSLatitude,
            "midwayGPSLongitude": self.midwayGPSLongitude,
            "midwayPointCity": self.midwayPointCity,
            "uniqueIdentifier": self.uniqueIdentifier,
        }
