from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import events_router, login_router, register_router
from .__meta import (TITLE,
                    DESCRIPTION,
                    VERSION,
                    TAGS_METADATA)


def init_api() -> FastAPI:
    api = FastAPI(
        title=TITLE,
        description=DESCRIPTION,
        version=VERSION,
        openapi_tags=TAGS_METADATA
    )
    origins = [
    "http://localhost:3000", 
    "http://127.0.0.1:5173",
    
]

    api.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
)
    
    api.include_router(login_router)
    api.include_router(register_router)
    api.include_router(events_router)
    
    return api