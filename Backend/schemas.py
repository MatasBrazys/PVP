from pydantic import BaseModel

# class UserCreate(BaseModel):
#     id_User: int
#     name: str
#     last_name: str
#     email: str
#     password: str
#     fk_subscribtion: int

class UserCreate(BaseModel):
    name: str
    last_name: str
    email: str
    password: str



class Config:
    orm_mode = True
