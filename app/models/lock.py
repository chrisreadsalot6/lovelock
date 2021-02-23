from datetime import datetime

from .db import db
from .user import User


class Lock(db.Model):
    __tablename__ = "locks"

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
            "initiatorCompassDirection": str(self.initiatorCompassDirection),
            "initiatorGPSLatitude": str(self.initiatorGPSLatitude),
            "initiatorGPSLongitude": str(self.initiatorGPSLongitude),
            "initiatorUserId": self.initiatorUserId,
            "joinerCompassDirection": str(self.joinerCompassDirection),
            "joinerGPSLatitude": str(self.joinerGPSLatitude),
            "joinerGPSLongitude": str(self.joinerGPSLongitude),
            "joinerUserId": self.joinerUserId,
            "midwayGPSLatitude": str(self.midwayGPSLatitude),
            "midwayGPSLongitude": str(self.midwayGPSLongitude),
            "midwayPointCity": self.midwayPointCity,
            "uniqueIdentifier": str(self.uniqueIdentifier),
        }
