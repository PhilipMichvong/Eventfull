from fastapi import FastAPI

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
    
    api.include_router(login_router)
    api.include_router(register_router)
    api.include_router(events_router)
    
    return api