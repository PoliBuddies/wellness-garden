import os

from flask import Flask

from backend.consts import INSTANCE_DIR
from backend.db.models import Journal, db

app = Flask(__name__, instance_path=INSTANCE_DIR)
app.config["DATABASE"] = os.path.join(INSTANCE_DIR, "db.sqlite")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
try:
    os.makedirs(app.instance_path)
except FileExistsError:
    pass

@app.route('/is-alive')
def is_alive():
    return 'Backend is alive!'


@app.route('/journals/<int:journal_id>/')
def get_journal(journal_id):
    return Journal.query.get(journal_id).as_dict(), 200


if __name__ == '__main__':
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run()
