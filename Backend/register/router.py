from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from register.models import UserCreate, UserResponse
from register.service import get_user_by_email, create_user

router = APIRouter(
    tags=["register"]
)

@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user.
    
    - **name**: User's first name
    - **last_name**: User's last name
    - **email**: User's email address (must be unique)
    - **password**: User's password
    
    Returns the created user information.
    """
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Email is already registered"
        )
    
    created_user = create_user(db=db, user=user)
    print(user)  
    return created_user 