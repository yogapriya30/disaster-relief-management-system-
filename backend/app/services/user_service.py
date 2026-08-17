from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.models.user import User
from app.schemas.user_schema import UserCreate
from app.security.authentication import hash_password, verify_password

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_users(db: Session):
    return db.query(User).all()

def create_user(db: Session, user: UserCreate):
    new_user = User(
        name=user.name,
        email=user.email,
        password=pwd_context.hash(user.password),
        role=user.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def update_user(db: Session, user_id: int, user_data: UserCreate):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return None
    user.name = user_data.name
    user.email = user_data.email
    user.password = pwd_context.hash(user_data.password)
    user.role = user_data.role
    db.commit()
    db.refresh(user)
    return user

def delete_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return None
    db.delete(user)
    db.commit()
    return user

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    
    if not user:
        return None
    if not pwd_context.verify(password, user.password):
        return None
    return user