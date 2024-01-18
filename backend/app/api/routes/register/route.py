from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from ...crud import users as crud
from ...db import SessionLocal
from ...models import schemas


router = APIRouter(
    prefix="/api/register",
    tags=["Register"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post(path="/", 
             status_code=status.HTTP_201_CREATED,
             response_model = schemas.User)
def register(user : schemas.UserCreate, db: Session = Depends(get_db)) -> schemas.User:
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, 
                            detail="E-mail already registered!")
    return crud.create_user(db=db, user=user)
