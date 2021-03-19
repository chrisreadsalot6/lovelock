import os

class Config:
  SECRET_KEY=os.environ.get('SECRET_KEY')
  if os.environ.get("FLASK_ENV") == "production":
    SQLALCHEMY_DATABASE_URI=postgres://xoiysdhgjdzdqm:ef18c6e02087abdc3e4034dd46ae767a533ba740e0394c636a80d125fe7367b4@ec2-54-211-176-156.compute-1.amazonaws.com:5432/daq8gsr4vabhhv
  else:
    SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URL')
  SQLALCHEMY_ECHO=True
  SQLALCHEMY_TRACK_MODIFICATIONS=False