from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    name: str
    last_name: str
    email: str
    password: str

    class Config:
         from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str


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
from pydantic import BaseModel

class UserUpdateRequest(BaseModel):
    token: str
    name: str
    last_name: str
    email: str
    current_password: Optional[str] = None
    new_password: Optional[str] = None
    repeat_password: Optional[str] = None
