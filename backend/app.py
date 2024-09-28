from flask import Flask

from backend.db.models import Journal

app = Flask(__name__)


@app.route('/is-alive')
def is_alive():
    return 'Backend is alive!'


@app.route('/journals/<int:journal_id>/')
def get_journal(journal_id):
    return Journal.query.get(journal_id).as_dict(), 200


if __name__ == '__main__':
    app.run()
