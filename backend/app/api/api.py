from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import events_router, login_router, register_router
from .__meta import (TITLE,
                    DESCRIPTION,
                    OPENAPI_URL,
                    VERSION,
                    TAGS_METADATA)


def init_api() -> FastAPI:
    api = FastAPI(
        title=TITLE,
        description=DESCRIPTION,
        openapi_url=OPENAPI_URL,
        version=VERSION,
        openapi_tags=TAGS_METADATA
    )
    origins = [
    "*",
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