from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    name: str
    last_name: str
    email: str
    password: str

    class Config:
         from_attributes = True


class UserCreate(BaseModel):
    """
    Model for user registration data.
    """
    name: str
    last_name: str
    email: str
    password: str

class UserResponse(BaseModel):
    """
    Model for user response data (returned after registration).
    """
    id_User: int
    name: str
    last_name: str
    email: str
    fk_Subscription: int

    class Config:
        from_attributes = True   


class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    user_id: Optional[int] = None

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id_User: int
    name: str
    last_name: str
    email: str
    fk_Subscription: int

    class Config:
        from_attributes = True 