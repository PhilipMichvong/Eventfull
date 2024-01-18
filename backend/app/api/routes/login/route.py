from fastapi import APIRouter, HTTPException, status

router = APIRouter(
    prefix="/api/login",
    tags=["Login"]
)


@router.post(path="/")
def login():
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Method not implemented yet!"
    )
