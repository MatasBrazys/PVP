from sqlalchemy.orm import Session
from passlib.context import CryptContext
import datetime
from models import User, Subscription
from register.models import UserCreate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_email(db: Session, email: str):
    """
    Get a user by email.
    
    Args:
        db: Database session
        email: User's email address
        
    Returns:
        User object if found, None otherwise
    """
    return db.query(User).filter(User.email == email).first()

def create_subscription(db: Session):
    """
    Create a new free subscription.
    
    Args:
        db: Database session
        
    Returns:
        Created subscription object
    """
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
    """
    Create a new user with a free subscription.
    
    Args:
        db: Database session
        user: User data
        
    Returns:
        Created user object
    """
   
    db_subscription = create_subscription(db)

    hashed_password = pwd_context.hash(user.password)

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