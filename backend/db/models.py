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
    journal = db.relationship('Journal', uselist=False, back_populates='user')

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
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, default=1, unique=True)
    user = db.relationship('User', back_populates='journal')

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
    date = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    journal_id = db.Column(db.Integer, db.ForeignKey('journal.id'), nullable=False)
    journal = db.relationship('Journal', backref=db.backref('entries', lazy=True))

    def as_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "creation_date": self.date,
            "journal": self.journal.title,
            "journal_id": self.journal.id
        }


# Activities functionality
class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, default=1)
    user = db.relationship('User', backref=db.backref('hobbies', lazy=True))
    icon = db.Column(db.String(80), nullable=False)

    def as_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "creation_date": self.created_at,
            "owner": self.user.username,
            "icon": self.icon,
            "moods": [mood.mood for mood in self.moods]
        }


class ActivityMood(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    mood = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    activity_id = db.Column(db.Integer, db.ForeignKey('activity.id'), nullable=False)
    activity = db.relationship('Activity', backref=db.backref('moods', lazy=True))

    def as_dict(self):
        return {
            "id": self.id,
            "mood": self.mood,
            "date": self.date,
            "activity": self.activity.name,
            "activity_id": self.activity.id,
        }


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

    def as_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "creation_date": self.created_at
        }


class SocialActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    mood = db.Column(db.Integer, nullable=False)
    friends = db.relationship('Friend', secondary=friends_activity, lazy='dynamic', backref=db.backref('social_activity', lazy=True))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, default=1)
    user = db.relationship('User', backref=db.backref('social_activities', lazy=True))

    def as_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "date": self.date,
            "mood": self.mood,
            "friends": [friend.name for friend in self.friends] # noqa
        }
