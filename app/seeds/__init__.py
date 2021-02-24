from flask.cli import AppGroup

from .locales import seed_locales, undo_locales
from .users import seed_users, undo_users

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")

# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    seed_users()
    seed_locales()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_locales()
    undo_users()
    # Add other undo functions here
