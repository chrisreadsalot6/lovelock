from datetime import datetime
from werkzeug.security import generate_password_hash

from app.models import db, User


def seed_users():

    admin = User(
        createdWhen=datetime.utcnow(),
        email="admin@demo.com",
        firstName="admin",
        lastName="demo",
        password="password",
        phoneNumber="888-888-8888",
        updatedWhen=datetime.utcnow(),
        username="admin",
    )

    demo = User(
        createdWhen=datetime.utcnow(),
        email="demo@demo.com",
        firstName="demo",
        lastName="demo",
        password="password",
        phoneNumber="000-000-0000",
        updatedWhen=datetime.utcnow(),
        username="demo",
    )

    demoOne = User(
        createdWhen=datetime.utcnow(),
        email="demoone@demo.com",
        firstName="demo",
        lastName="demo",
        password="password",
        phoneNumber="111-111-1111",
        updatedWhen=datetime.utcnow(),
        username="demoone",
    )

    demoTwo = User(
        createdWhen=datetime.utcnow(),
        email="demotwo@demo.com",
        firstName="demo",
        lastName="demo",
        password="password",
        phoneNumber="222-222-2222",
        updatedWhen=datetime.utcnow(),
        username="demotwo",
    )

    db.session.add(admin)
    db.session.add(demo)
    db.session.add(demoOne)
    db.session.add(demoTwo)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute("TRUNCATE users CASCADE;")
    db.session.commit()
