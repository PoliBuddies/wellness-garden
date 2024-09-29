import calendar
import datetime
import os

import sqlalchemy
from flask import Flask, request
from flask_cors import CORS, cross_origin
from sqlalchemy.exc import DatabaseError

from backend.consts import INSTANCE_DIR
from db.models import Journal, User, db, Activity, Friend, SocialActivity, ActivityMood, Entry

app = Flask(__name__)

cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["DATABASE"] = os.path.join(INSTANCE_DIR, "wellness-garden.sqlite")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///wellness-garden.sqlite"

try:
    os.makedirs(app.instance_path)
except FileExistsError:
    pass

db.init_app(app)


def get_all_users_social_activities_in_month(user_id, year, month):
    social_activities = SocialActivity.query.filter(
        SocialActivity.user_id == user_id,
        sqlalchemy.extract("year", SocialActivity.date) == year,
        sqlalchemy.extract("month", SocialActivity.date) == month,
    ).all()
    return social_activities


def get_all_activity_moods_in_month(user_id, year, month):
    activities = ActivityMood.query.filter(
        sqlalchemy.extract('year', ActivityMood.date) == year,
        sqlalchemy.extract('month', ActivityMood.date) == month,
        ActivityMood.activity.has(user_id=user_id)).all()
    return activities


def get_all_users_entries_in_month(user_id, year, month):
    entries = Entry.query.filter(
        Entry.journal.has(user_id=user_id),
        sqlalchemy.extract("year", Entry.date) == year,
        sqlalchemy.extract("month", Entry.date) == month
    ).all()
    return entries


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
            date = (datetime.datetime.strptime(body['date'], "%Y-%m-%dT%H:%M")
                    if 'date' in body else datetime.datetime.now())
        except KeyError:
            return "Invalid request", 400
        journal_id = User.query.filter(User.id == user_id).one_or_404().journal.id
        entry = Entry(title=title, content=content, journal_id=journal_id, date=date)
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
@cross_origin()
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
            icon = body['icon']
        except (KeyError, ValueError, TypeError):
            return "Invalid request", 400
        activity: Activity = Activity(name=name, description=description, icon=icon)
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


@app.route('/socials/<int:user_id>/date/', methods=['GET'])
def social_activities_date(user_id: int):
    body = request.json
    date = None
    date_from = None
    date_to = None
    try:
        if 'date' in body:
            date = datetime.datetime.strptime(body['date'], "%Y-%m-%dT%H:%M")
        elif 'date_range' in body:
            date_range = body['date_range']
            date_from = datetime.datetime.strptime(date_range['from'], "%Y-%m-%dT%H:%M")
            date_to = datetime.datetime.strptime(date_range['to'], "%Y-%m-%dT%H:%M")
        else:
            raise ValueError
    except (KeyError, ValueError, TypeError):
        return "Invalid request", 400
    if date:
        social_activities = SocialActivity.query.filter_by(user_id=user_id, date=date).all()
    else:
        social_activities = SocialActivity.query.filter(SocialActivity.user_id == user_id,
                                                        SocialActivity.date >= date_from,
                                                        SocialActivity.date <= date_to).all()
    if not social_activities:
        return "No activities found", 404
    return [activity.as_dict() for activity in social_activities], 200


@app.route('/calendar/<int:user_id>/<int:year>/<int:month>/', methods=['GET'])
def calendar_endpoint(user_id: int, year: int, month: int):
    activities_moods = get_all_activity_moods_in_month(user_id, year, month)
    social_activities = get_all_users_social_activities_in_month(user_id, year, month)
    entries = get_all_users_entries_in_month(user_id, year, month)
    print(entries)
    days = calendar.monthrange(year, month)[1]
    response = []
    for idx in range(days):
        response.append({
            "day": idx + 1,
            "activities": [],
            "social_activities": [],
            "entry_title": "",
            "entry_content": ""
        })
    for entry in entries:
        response[entry.date.day - 1]['entry_title'] = entry.title
        response[entry.date.day - 1]['entry_content'] = entry.content
    for activity_mood in activities_moods:
        response[activity_mood.date.day - 1]['activities'].append({
            "name": activity_mood.activity.name,
            "description": activity_mood.activity.description,
            "mood": activity_mood.mood
        })
    for social_activity in social_activities:
        response[social_activity.date.day - 1]['social_activities'].append(social_activity.as_dict())
    return response


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        if not User.query.filter_by(id=1).one_or_none():
            print("Populating database for presentation purposes")
            user = User(username="buddy", password="qwerty", name="Study Buddy")
            journal = Journal(title="My Journal", description="My personal journal", user=user)
            db.session.add(user)
            db.session.add(journal)
            entry = Entry(title="First entry", content="This is my first entry", journal=journal)
            db.session.add(entry)
            activity = Activity(name="Running", description="Running in the park", user=user, icon="🏃")
            db.session.add(activity)
            mood = ActivityMood(mood=5, date=datetime.datetime.now(), activity=activity)
            db.session.add(mood)
            friend = Friend(name="John", description="My friend")
            db.session.add(friend)
            social_activity = SocialActivity(name="Party", description="Party with friends", mood=5, date=datetime.datetime.now())
            social_activity.friends.append(friend)
            db.session.add(social_activity)
            db.session.commit()
    app.run()
