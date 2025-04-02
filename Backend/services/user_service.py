from sqlalchemy.orm import Session
import datetime
from models import User, Subscription
from schemas import UserCreate
from utils.hashing import hash_password

def get_user_by_email(db: Session, email: str):
    """Get a user by email."""
    return db.query(User).filter(User.email == email).first()

def create_subscription(db: Session):
    """Create a new free subscription."""
    db_subscription = Subscription(
        date_from=datetime.date.today(),
        date_to=None,
        subscription='free'
    )
    db.add(db_subscription)
    db.commit()
    db.refresh(db_subscription)
    return db_subscription

def create_user(db: Session, user: UserCreate):
    """Create a new user with a free subscription."""
    db_subscription = create_subscription(db)
    hashed_password = hash_password(user.password)

    db_user = User(
        name=user.name,
        last_name=user.last_name,
        email=user.email,
        password=hashed_password,
        fk_Subscription=db_subscription.id_Subscription  
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
