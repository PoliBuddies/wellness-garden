import datetime
import json
import os

from flask import Flask, request
from sqlalchemy.exc import DatabaseError

from backend.consts import INSTANCE_DIR
from db.models import Journal, User, db, Activity, Friend, SocialActivity, ActivityMood, Entry

app = Flask(__name__)

app.config["DATABASE"] = os.path.join(INSTANCE_DIR, "db.sqlite")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
try:
    os.makedirs(app.instance_path)
except FileExistsError:
    pass

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


@app.route('/journals/<int:user_id>/entries/', methods=['GET', 'POST'])
def entries_endpoint(user_id: int):
    if request.method == 'GET':
        entries = Journal.query.filter_by(user_id=user_id).one_or_404().entries
        if not entries:
            return "No entries found", 404
        return [entry.as_dict() for entry in entries], 200
    elif request.method == 'POST':
        body = request.json
        try:
            title = body['title']
            content = body['content']
            journal_id = body['journal_id']
        except KeyError:
            return "Invalid request", 400
        entry = Entry(title=title, content=content, journal_id=journal_id)
        db.session.add(entry)
        try:
            db.session.commit()
            return entry.as_dict(), 201
        except DatabaseError as e:
            print(e)
            return "Error occurred while saving entry", 500


@app.route('/journals/<int:user_id>/entries/<int:entry_id>/', methods=['GET', 'PATCH'])
def entry_endpoint(user_id: int, entry_id: int):
    if request.method == 'GET':
        entry = Entry.query.filter_by(journal_id=user_id, id=entry_id).one_or_404()
        return entry.as_dict(), 200
    elif request.method == 'PATCH':
        body = request.json
        try:
            new_title = body['title']
            new_content = body['content']
        except KeyError:
            return "Invalid request", 400
        entry = Entry.query.filter_by(journal_id=user_id, id=entry_id).one_or_404()
        entry.title = new_title
        entry.content = new_content
        db.session.commit()
        return entry.as_dict(), 200


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
        try:
            db.session.commit()
            return activity.as_dict(), 201
        except DatabaseError as e:
            print(e)
            return "Error occurred while saving activity", 500


@app.route('/activities/<int:user_id>/<int:activity_id>/', methods=['GET'])
def activity_endpoint(user_id: int, activity_id: int):
    return Activity.query.filter_by(user_id=user_id, id=activity_id).one_or_404().as_dict(), 200


@app.route('/activities/<int:user_id>/<int:activity_id>/moods/', methods=['GET', 'POST'])
def add_activity_mood(user_id: int, activity_id: int):
    if request.method == 'GET':
        moods = ActivityMood.query.filter_by(activity_id=activity_id).all()
        if not moods:
            return "No moods found", 404
        return [mood.as_dict() for mood in moods], 200
    elif request.method == 'POST':
        body = request.json
        try:
            mood = int(body['mood'])
            date = datetime.datetime.strptime(body['date'], "%Y-%m-%dT%H:%M")
        except (KeyError, ValueError, TypeError) as e:
            print(e)
            return "Invalid request", 400
        mood = ActivityMood(mood=mood, date=date, activity_id=activity_id)
        db.session.add(mood)
        try:
            db.session.commit()
            return mood.as_dict(), 201
        except DatabaseError as e:
            print(e)
            return "Error occurred while saving mood", 500


@app.route('/activities/<int:user_id>/<int:activity_id>/moods/<int:mood_id>/', methods=['PATCH'])
def update_mood(user_id: int, activity_id: int, mood_id: int):
    body = request.json
    try:
        new_mood = int(body['mood']) if 'mood' in body else None
        date = datetime.datetime.strptime(body['date'], "%Y-%m-%dT%H:%M") if 'date' in body else None
    except (ValueError, TypeError):
        return "Invalid request", 400
    mood = ActivityMood.query.filter_by(id=mood_id).one_or_404()
    if new_mood:
        mood.mood = new_mood
    if date:
        mood.date = date
    db.session.commit()
    return mood.as_dict(), 200


@app.route('/friends/<int:user_id>/', methods=['GET', 'POST'])
def friends_enpoint(user_id: int):
    if request.method == 'GET':
        friends = Friend.query.filter_by(user_id=user_id).all()
        if not friends:
            return "No friends found", 404
        return [friend.as_dict() for friend in friends], 200
    elif request.method == 'POST':
        body = request.json
        try:
            name = body['name']
            description = body['description']
        except KeyError:
            return "Invalid request", 400
        friend: Friend = Friend(name=name, description=description)
        db.session.add(friend)
        try:
            db.session.commit()
        except DatabaseError as e:
            print(e)
            return "Error occurred while saving friend", 500
        return friend.as_dict(), 201


@app.route('/socials/<int:user_id>/', methods=['GET', 'POST'])
def socials(user_id: int):
    if request.method == 'GET':
        social_activities = SocialActivity.query.filter_by(user_id=user_id).all()
        if not social_activities:
            return "No social activities found", 404
        return [social_activity.as_dict() for social_activity in social_activities], 200
    elif request.method == 'POST':
        body = request.json
        try:
            name = body['name']
            description = body['description']
            mood = int(body['mood'])
            date = datetime.datetime.strptime(body['date'], "%Y-%m-%dT%H:%M")
            friends_ids = body['friends_ids']
        except (KeyError, ValueError, TypeError):
            return "Invalid request", 400
        social: SocialActivity = SocialActivity(name=name, description=description, mood=mood, date=date)
        for friend_id in friends_ids:
            friend = Friend.query.filter_by(id=friend_id).one_or_404()
            social.friends.append(friend)
        db.session.add(social)
        try:
            db.session.commit()
        except DatabaseError as e:
            print(e)
            return "Error occurred while saving social activity", 500
        return social.as_dict(), 201


if __name__ == '__main__':
    db.init_app(app)
    with app.app_context():
        db.create_all()
        if not User.query.filter_by(id=1).one_or_none():
            user = User(username="buddy", password="qwerty", name="Study Buddy")
            db.session.add(user)
            db.session.commit()
    app.run()
