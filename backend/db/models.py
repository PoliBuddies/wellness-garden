from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

friends_activity = db.Table('friends_activity',
    db.Column('friend_id', db.Integer, db.ForeignKey('friend.id'), primary_key=True),
    db.Column('social_activity_id', db.Integer, db.ForeignKey('social_activity.id'), primary_key=True)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    name = db.Column(db.String(80), nullable=False)

    def as_dict(self):
        return {
            "id": self.id,
        }

# Journal functionality
class Journal(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, default=1)

    def as_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "creation_date": self.created_at,
            "owner": self.user.username,
            "entries": [entry.id for entry in self.entries]
        }


class Entry(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(80), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    journal_id = db.Column(db.Integer, db.ForeignKey('journal.id'), nullable=False)
    journal = db.relationship('Journal', backref=db.backref('entries', lazy=True))


# Activities functionality
class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)
    points = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, default=1)
    user = db.relationship('User', backref=db.backref('hobbies', lazy=True))


class ActivityMood(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    mood = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    activity_id = db.Column(db.Integer, db.ForeignKey('activity.id'), nullable=False)
    activity = db.relationship('Activity', backref=db.backref('moods', lazy=True))


# Friends tree functionality
class Friend(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, default=1)
    user = db.relationship('User', backref=db.backref('friends', lazy=True))

    def __repr__(self):
        return f'<Friend {self.name}>'


class SocialActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    mood = db.Column(db.Integer, nullable=False)
    friends = db.relationship('Friend', secondary=friends_activity, lazy='dynamic', backref=db.backref('social_activity', lazy=True))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, default=1)
    user = db.relationship('User', backref=db.backref('social_activity', lazy=True))
