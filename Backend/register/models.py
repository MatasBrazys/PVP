from pydantic import BaseModel

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
        orm_mode = True 