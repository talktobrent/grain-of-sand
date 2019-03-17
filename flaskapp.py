from flask import Flask
from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import ForeignKey
from datetime import datetime
import psycopg2

app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:ubuntu@localhost:5432/mytestdb'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost:5432/mytestdb'


db = SQLAlchemy(app)


user_wordmaps = db.Table("user_wordmaps", db.Model.metadata,
                        db.Column('user_id', db.Integer, db.ForeignKey('Users.id')),
                        db.Column('words_id', db.String(128), db.ForeignKey('Maps.Words'))
                        # db.UniqueConstraint('user_id', 'words_id')
                        )

class User(db.Model):
  __tablename__ = 'Users'
  id = db.Column(db.Integer, primary_key=True)
  access_token = db.Column(db.String(2056), unique=True, nullable=False)
  name = db.Column(db.String(128), unique=True, nullable=False)
  email = db.Column(db.String(128), unique=True, nullable=False)
  img_link = db.Column(db.String(2056))
  # maps = db.relationship("Map", secondary=user_wordmaps)
  # Maps = db.relationship('Map', back_populates='Map', viewonly=False)
  def __repr__(self):
    return 'Users({}, {}, {}, {}, {})'.format(self.id, self.access_token, self.name, self.email, self.img_link) 

class Map(db.Model):
  __tablename__ = 'Maps'
  id = db.Column(db.Integer, nullable=True)
  Address = db.Column(db.String(128), unique=True, nullable=True)
  Latitude = db.Column(db.Integer, nullable=True, default=0)
  Longitude = db.Column(db.Integer, nullable=True, default=0)
  # Name = db.Column(db.Text, nullable=True)
  Words = db.Column(db.String(128), primary_key=True, nullable=False)
  users_rel = db.relationship("Users", secondary=user_wordmaps)
  # Words = db.Column(db.Unicode)
  # Created_At = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
  # User = db.relationship('User', back_populates='User', viewonly=False)
  # user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

  def __repr__(self):
    return 'Maps({}, {}, {}, {})'.format(self.Address, self.Latitude, self.Longitude, self.users)  
    # return f"Maps('{self.Address}', '{self.Latitude}', '{self.Longitude}')"

# posts = [
#   {
#     'Address': 'San Francisco, CA 94128, United States',
#     'Latitude': '37.6148', 
#     'Longitude': '-122.39179', 
#     'Name': 'San Francisco Int'l Airport', 
#     'Words': 'remind.scare.nail'
#     # 'Date_posted': 'April 20, 2018'
#   }
# ]
