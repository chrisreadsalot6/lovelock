from datetime import datetime

from .db import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    createdWhen = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updatedWhen = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    email = db.Column(db.String(255), nullable=False, unique=True)
    firstName = db.Column(db.String(100), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    lastName = db.Column(db.String(100), nullable=False)
    phoneNumber = db.Column(db.String(20), nullable=False, unique=True)
    username = db.Column(db.String(50), nullable=False, unique=True)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "createdWhen": self.createdWhen,
            "updatedWhen": self.updatedWhen,
            "email": self.email,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "phoneNumber": self.phoneNumber,
            "username": self.username,
        }

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)
