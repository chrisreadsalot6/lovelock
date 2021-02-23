from flask.cli import AppGroup
from .locales import seed_locales, undo_locales
# from .locks import seed_locks, undo_locks
from .users import seed_users, undo_users

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")

# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    # seed_locales()
    # seed_locks()
    # seed_users()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_locales()
    # undo_locks()
    undo_users()
    # Add other undo functions here
