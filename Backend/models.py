from sqlalchemy import Column, Integer, String, ForeignKey, Date, Enum
from database import Base
import datetime

class Subscription(Base):
    __tablename__ = "subscription"  # Duomenų bazės lentelės pavadinimas

    id_Subscription = Column(Integer, primary_key=True, index=True)
    date_from = Column(Date, default=datetime.date.today)
    date_to = Column(Date, nullable=True)
    subscription = Column(Enum('free', 'basic', 'pro', name='subscription_type'), default='free')

class User(Base):
    __tablename__ = "user"  # Duomenų bazės lentelės pavadinimas

    id_User = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    last_name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    fk_Subscription = Column(Integer, ForeignKey('subscription.id_Subscription'), default=1)

class CV(Base):
    __tablename__ = "cv"  # Duomenų bazės lentelės pavadinimas

    id_CV = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    file_path = Column(String)
    fk_User = Column(Integer, ForeignKey('user.id_User'))
