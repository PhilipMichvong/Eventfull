from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
import bcrypt
from fastapi.responses import JSONResponse
from ...crud import users as crud
from ...db import SessionLocal
from ...models import schemas


router = APIRouter(
    prefix="/api/login",
    tags=["Login"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def __is_pwd_valid(pwd : str, pwd_hash : str) -> bool:
    return bcrypt.checkpw(pwd.encode('utf-8'), pwd_hash.encode('utf-8'))


@router.post(path="/",
             status_code=status.HTTP_200_OK,
             response_model = schemas.User)
def login(user : schemas.UserCreate, db : Session = Depends(get_db)) -> schemas.User:
    db_user = crud.get_user_by_email(db, email=user.email)
    if not db_user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="User does not exists!")
    else:
        if __is_pwd_valid(user.password, db_user.password):
            return db_user
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Invalid e-mail or password!")