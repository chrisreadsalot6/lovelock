from datetime import datetime
from werkzeug.security import generate_password_hash

from app.models import db, User

# Adds a demo user, you can add other users here if you want


def seed_users():

    demoOne = User(
        username='DemoOne',
        firstName='DemoOne',
        lastName='DemoOne',
        email='demoOne@aa.io',
        phoneNumber='111-111-1111',
        password='password',
        created=datetime.utcnow()
    )

    demoTwo = User(
        username='DemoTwo',
        firstName='DemoTwo',
        lastName='DemoTwo',
        email='demoTwo@aa.io',
        phoneNumber='222-222-2222',
        password='password',
        created=datetime.utcnow()
    )

    db.session.add(demoOne)
    db.session.add(demoTwo)

    db.session.commit()

    # Uses a raw SQL query to TRUNCATE the users table.
    # SQLAlchemy doesn't have a built in function to do this
    # TRUNCATE Removes all the data from the table, and resets
    # the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
