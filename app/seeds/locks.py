from datetime import datetime

from app.models import db, Lock

def seed_locks():

      harvard_yard = Locale(
        createdWhen=datetime.utcnow(),
        GPSLatitude="42.374394",
        GPSLongitude="-71.116257",
        localTimezoneOffset=5,
        name="Harvard Yard",
        updatedWhen=datetime.utcnow(),
        userId=1,
    )

    joe = Locale(
        createdWhen=datetime.utcnow(),
        GPSLatitude="40.9206",
        GPSLongitude="-74.0722",
        localTimezoneOffset=5,
        name="Joe",
        updatedWhen=datetime.utcnow(),
        userId=1,
    )

    mecca = Locale(
        createdWhen=datetime.utcnow(),
        GPSLatitude="21.422487",
        GPSLongitude="39.826206",
        localTimezoneOffset=5,
        name="Mecca",
        updatedWhen=datetime.utcnow(),
        userId=1,
    )

    sphinx = Locale(
        createdWhen=datetime.utcnow(),
        GPSLatitude="29.974999999999998",
        GPSLongitude="31.1375",
        localTimezoneOffset=5,
        name="Sphinx",
        updatedWhen=datetime.utcnow(),
        userId=1,
    )

    stephen_colbert = Locale(
        createdWhen=datetime.utcnow(),
        GPSLatitude="40.763771",
        GPSLongitude="-73.983040",
        localTimezoneOffset=5,
        name="Stephen Colbert",
        updatedWhen=datetime.utcnow(),
        userId=1,
    )

    the_white_house = Locale(
        createdWhen=datetime.utcnow(),
        GPSLatitude="38.897957",
        GPSLongitude="-77.036560",
        localTimezoneOffset=5,
        name="The White House",
        updatedWhen=datetime.utcnow(),
        userId=1,
    )

    db.session.add(harvard_yard)
    db.session.add(joe)
    db.session.add(mecca)
    db.session.add(sphinx)
    db.session.add(stephen_colbert)
    db.session.add(the_white_house)

    db.session.commit()

def undo_locks():
  db.session.exeucte("TRUNCATE locks CASCADE;")
  db.session.commit()