from pydantic import BaseModel
class UserCreate(BaseModel):
    name:str
    email:str
    password:str
    role:str= "volunteer"


class LoginRequest(BaseModel):
    email:str
    password:str


class TokenResponse(BaseModel):
    access_token:str
    token_type:str="bearer"
    role:str