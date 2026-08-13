from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.user_schema import UserCreate, LoginRequest, TokenResponse
from app.services.user_service import (
    get_users, create_user, get_user_by_id,
    update_user, delete_user, authenticate_user
)
from app.security.authentication import create_access_token

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/")
def list_users(db: Session = Depends(get_db)):
    return get_users(db)

@router.post("/")
def add_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)

@router.get("/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    return get_user_by_id(db, user_id)

@router.put("/{user_id}")
def edit_user(user_id: int, user_data: UserCreate, db: Session = Depends(get_db)):
    return update_user(db, user_id, user_data)

@router.delete("/{user_id}")
def remove_user(user_id: int, db: Session = Depends(get_db)):
    return delete_user(db, user_id)

@router.post("/login", response_model=TokenResponse)
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(db, credentials.email, credentials.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token({"sub": str(user.id), "email": user.email})
    return {"access_token": token, "token_type": "bearer"}