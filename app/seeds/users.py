from datetime import datetime
from werkzeug.security import generate_password_hash

from app.models import db, User

# Adds a demo user, you can add other users here if you want


def seed_users():

    demo = User(
        createdWhen=datetime.utcnow(),
        updatedWhen=datetime.utcnow(),
        email="demo@demo.com",
        firstName="demo",
        password="password",
        lastName="demo",
        phoneNumber="000-000-0000",
        username="demo",
    )

    demoOne = User(
        createdWhen=datetime.utcnow(),
        updatedWhen=datetime.utcnow(),
        email="demoone@demo.com",
        firstName="demo",
        password="password",
        lastName="demo",
        phoneNumber="111-111-1111",
        username="demoone",
    )

    demoTwo = User(
        createdWhen=datetime.utcnow(),
        updatedWhen=datetime.utcnow(),
        email="demotwo@demo.com",
        firstName="demo",
        password="password",
        lastName="demo",
        phoneNumber="222-222-2222",
        username="demotwo",
    )

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
