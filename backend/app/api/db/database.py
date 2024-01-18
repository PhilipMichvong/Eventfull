import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from ..config import settings

DB_CONN_URL = f"mysql+pymysql://{settings.db_user}:{settings.db_passwd}@{settings.db_host}:{settings.db_port}/{settings.db_dbname}"

engine = create_engine(DB_CONN_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
