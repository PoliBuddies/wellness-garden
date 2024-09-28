import json

from flask import Flask, request
from sqlalchemy.exc import DatabaseError

from db.models import Journal, User, db, Activity, Friend, SocialActivity

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///welness-garden.db'
db.init_app(app)


@app.route('/is-alive')
def is_alive():
    return 'Backend is alive!'


@app.route('/users/<username>')
def users(username):
    return User.query.filter_by(username=username).one_or_404().as_dict(), 200


@app.route('/journals/<int:user_id>/', methods=['GET', 'POST'])
def journals_enpoint(user_id: int):
    if request.method == 'POST':
        user = User.query.filter_by(id=user_id).one_or_404()
        body = request.json
        try:
            title = body['title']
            description = body['description']
        except KeyError:
            return "Invalid request", 400
        journal: Journal = Journal(
            title=title,
            description=description,
            user=user)
        db.session.add(journal)
        try:
            db.session.commit()
            return journal.as_dict(), 201
        except DatabaseError as e:
            print(e)
            return "This user already has a journal", 400
    elif request.method == 'GET':
        return Journal.query.filter_by(user_id=user_id).one_or_404().as_dict(), 200


@app.route('/activities/<int:user_id>/', methods=['GET', 'POST'])
def activities_enpoint(user_id: int):
    if request.method == 'GET':
        activities = Activity.query.filter_by(user_id=user_id).all()
        if not activities:
            return "No activities found", 404
        return [activity.as_dict() for activity in activities], 200
    elif request.method == 'POST':
        body = request.json
        try:
            name = body['title']
            description = body['description']
            points = int(body['points'])
        except (KeyError, ValueError, TypeError):
            return "Invalid request", 400
        activity: Activity = Activity(name=name, description=description, points=points)
        db.session.add(activity)
        db.session.commit()
        return "success", 200


@app.route('/activities/<int:user_id>/<int:activity_id>/>', methods=['GET', 'PATCH'])
def activity(user_id: int, activity_id: int):
    if request.method == 'GET':
        return Activity.query.filter_by(user_id=1, id=activity_id).first().as_dict(), 200
    elif request.method == 'PATCH':
        body = request.json
        points = body['points']
        activity: Activity = Activity.query.filter_by(user_id=1, id=activity_id).first()
        activity.points += points
        db.session.add(activity)
        db.session.commit()
        return "success", 200


@app.route('/friends/<int:user_id>/', methods=['GET', 'POST'])
def friends(user_id: int):
    if request.method == 'GET':
        return Friend.query.filter_by(user_id=1).first().friends, 200
    elif request.method == 'POST':
        body = request.get_json(silent=True)
        name = body['name']
        description = body['description']
        friend: Friend = Friend(name=name, description=description)
        db.session.add(friend)
        db.session.commit()
        return "success", 200


@app.route('/socials/<int:user_id>/', methods=['GET', 'POST'])
def socials(user_id: int):
    if request.method == 'GET':
        return SocialActivity.query.filter_by(user_id=1).first(), 200
    elif request.method == 'POST':
        body = request.get_json(silent=True)
        name = body['name']
        description = body['description']
        mood = body['mood']
        friend_id = body['friend_id']
        social: SocialActivity = SocialActivity(name=name, description=description, mood=mood, friend_id=friend_id)
        db.session.add(social)
        db.session.commit()
        return "success", 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        if not User.query.filter_by(id=1).one_or_none():
            user = User(username="buddy", password="qwerty", name="Study Buddy")
            db.session.add(user)
            db.session.commit()
    app.run()
