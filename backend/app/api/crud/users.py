import bcrypt
import uuid
from sqlalchemy.orm import Session
from ..models import schemas, tables


def get_user(db: Session, user_uuid: uuid.UUID):
    return db.query(tables.User).filter(tables.User.uuid == user_uuid).first()


def get_user_by_email(db: Session, email: str):
    return db.query(tables.User).filter(tables.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(tables.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    
    password_hash = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    db_user = tables.User(email=user.email, password=password_hash)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
