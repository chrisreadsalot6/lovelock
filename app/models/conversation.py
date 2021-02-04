from datetime import datetime
from .db import db
from .user import User


class Conversation(db.Model):
    __tablename__ = 'conversations'

    id = db.Column(db.Integer, primary_key=True)
    uniqueIdentifier = db.Column(db.String(100), nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=True)
    initiatorUserId = db.Column(
        db.Integer, db.ForeignKey(User.id), nullable=False)
    joinerUserId = db.Column(
        db.Integer, db.ForeignKey(User.id))
    initiatorGPSLocation = db.Column(db.String(100), nullable=False)
    joinerGPSLocation = db.Column(db.String(100))
    initiatorDirection = db.Column(db.String(100), nullable=False)
    joinerDirection = db.Column(db.String(100))
    midwayGPSLocation = db.Column(db.String(100))
    midwayCity = db.Column(db.String(50))
    createTime = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    startTime = db.Column(db.DateTime)
    endTime = db.Column(db.DateTime)

    initiatorUser = db.relationship(
        'User',
        foreign_keys=[initiatorUserId],
        backref='initiator_conversations'
    )
    joinerUser = db.relationship(
        'User',
        foreign_keys=[joinerUserId],
        backref='joiner_conversations'
    )

    def to_dict(self):
        return {
            "uniqueIdentifier": self.uniqueIdentifier,
            "active": self.active,
            "initiatorUserId": self.initiatorUserId,
            "joinerUserId": self.joinerUserId,
            "initiatorGPSLocation": self.initiatorGPSLocation,
            "joinerGPSLocation": self.joinerGPSLocation,
            "initiatorDirection": self.initiatorDirection,
            "joinerDirection": self.joinerDirection,
            "midwayGPSLocation": self.midwayGPSLocation,
            "midwayCity": self.midwayCity,
            "startTime": self.startTime,
            "endTime": self.endTime
        }
