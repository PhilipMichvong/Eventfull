import uuid
from pydantic import BaseModel

class UserBase(BaseModel):
    email:  str


class UserCreate(UserBase):
    password:   str

    class Config:
        from_attributes = True
        
        json_schema_extra = {
            "example" : {
                "email" : "j.kowalski@gmail.com",
                "password" : "Password1"
            }
        }


class User(UserBase):
    uuid:   uuid.UUID

    class Config:
        from_attributes = True