from api import init_api


app = init_api()


if __name__ == "__main__":
    import uvicorn
    from conf import settings
    uvicorn.run(app, host=settings.host, port=settings.port)
