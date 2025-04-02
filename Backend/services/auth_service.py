from sqlalchemy.orm import Session
from models import User
from utils.hashing import verify_password
from utils.jwt_helper import decode_jwt
from schemas import TokenData

def get_user_by_email(db: Session, email: str):
    """Get a user by email."""
    return db.query(User).filter(User.email == email).first()

def authenticate_user(db: Session, email: str, password: str):
    """Authenticate user with email and password."""
    user = get_user_by_email(db, email)
    if not user or not verify_password(password, user.password):
        return None
    return user

def get_current_user(db: Session, token: str):
    """Get the current user from JWT token."""
    payload = decode_jwt(token)
    if not payload:
        return None

    email = payload.get("sub")
    return get_user_by_email(db, email)