from fastapi import APIRouter, HTTPException, status

router = APIRouter(
    prefix="/api/register",
    tags=["Register"]
)


@router.post(path="/worker")
def register():
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Method not implemented yet!"
    )
