from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import users_col
from utils.security import hash_password, verify_password
from datetime import datetime

router = APIRouter()

class User(BaseModel):
    username: str
    email: str
    password: str

@router.post("/signup")
def signup(user: User):
    if users_col.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pw = hash_password(user.password)
    users_col.insert_one({
        "username": user.username,
        "email": user.email,
        "password_hash": hashed_pw,
        "created_at": datetime.utcnow()
    })
    return {"message": "Signup successful"}

@router.post("/login")
def login(user: User):
    record = users_col.find_one({"email": user.email})
    if not record or not verify_password(user.password, record["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    return {"message": "Login successful", "username": record["username"]}
