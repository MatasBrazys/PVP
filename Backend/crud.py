from sqlalchemy.orm import Session
from models import User, Subscription
from auth import pwd_context
import datetime

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user_subscription(db: Session, email: str):
    return db.query(Subscription).filter(Subscription.id_Subscription == User.fk_Subscription).first()

def create_subscription(db: Session):
    db_subscription = Subscription(
        date_from=datetime.date.today(),
        date_to=None,
        subscription="free"
    )
    db.add(db_subscription)
    db.commit()
    db.refresh(db_subscription)
    return db_subscription

def create_user(db: Session, user):
    db_subscription = create_subscription(db)
    # hashed_password = pwd_context.hash(user.password)

    db_user = User(
        name=user.name,
        last_name=user.last_name,
        email=user.email,
        password=user.password,
        fk_Subscription=db_subscription.id_Subscription 
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
