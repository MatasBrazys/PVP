from passlib.context import CryptContext
from auth import pwd_context

def verify_password(plain_password, hashed_password):
    """Verifies if the entered password matches the hashed password"""
    return pwd_context.verify(plain_password, hashed_password)


def hash_password(password: str) -> str:
    """Hashes a plain text password."""
    return pwd_context.hash(password)