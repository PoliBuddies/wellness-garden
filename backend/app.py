from flask import Flask, request

from backend.db.models import Journal, User, db

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///welness-garden.db'
db.init_app(app)


@app.route('/is-alive')
def is_alive():
    return 'Backend is alive!'


@app.route('/users/<username>')
def users(username):
    return User.query.first(), 200


@app.route('/journals/<int:journal_id>/', methods=['GET', 'POST'])
def journals(journal_id: int = None):
    if request.method == 'POST':
        journal: Journal = Journal(
            title=request.form['title'],
            description=request.form['description'],
            user_id=1)
        db.session.add(journal)
        db.session.commit()
        return "success", 200
    elif request.method == 'GET':
        return Journal.query.filter_by(id=journal_id).first().as_dict(), 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        if not User.query.filter_by(id=1):
            user = User(username="buddy", password="qwerty", name="Study Buddy")
            db.session.add(user)
            db.session.commit()
    app.run()
