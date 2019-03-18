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

# user_wordmaps = db.Table("user_wordmaps", db.Model.metadata,
#                         db.Column('user_id', db.Integer, db.ForeignKey('Users.id')),
#                         db.Column('words_id', db.String(128), db.ForeignKey('Maps.Words'))
#                         # db.UniqueConstraint('user_id', 'words_id')
#                         )

class User_Map(db.Model):
  __tablename__ = 'User_Map'
  id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
  user_id = db.Column(db.Integer, nullable=True)
  access_token = db.Column(db.String(2056), unique=True, nullable=False)
  name = db.Column(db.String(128), unique=True, nullable=False)
  email = db.Column(db.String(128), unique=True, nullable=False)
  img_link = db.Column(db.String(2056))
  Address = db.Column(db.String(128), unique=True, nullable=True)
  Words = db.Column(db.String(128), nullable=False, unique=True)
  Latitude = db.Column(db.Integer, nullable=True, default=0)
  Longitude = db.Column(db.Integer, nullable=True, default=0)
  # maps = db.relationship("Map", secondary=user_wordmaps)
  # Maps = db.relationship('Map', back_populates='Map', viewonly=False)
  def __repr__(self):
    return 'User_Map({}, {}, {}, {}, {}, {}, {}, {}, {})'.format(self.user_id, self.access_token, self.name, self.email, self.img_link, self.Address, self.Words, self.Latitude, self.Longitude) 


# class Map(db.Model):
#   __tablename__ = 'Maps'
#   user_id = db.Column(db.Integer, nullable=True)
#   Address = db.Column(db.String(128), unique=True, nullable=True)
#   Latitude = db.Column(db.Integer, nullable=True, default=0)
#   Longitude = db.Column(db.Integer, nullable=True, default=0)
#   Words = db.Column(db.String(128), primary_key=True, nullable=False, unique=True)

#   def __repr__(self):
#     return 'Maps({}, {}, {}, {}, {})'.format(self.user_id, self.Address, self.Latitude,self.Longitude, self.Words)
