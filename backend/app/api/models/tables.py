from sqlalchemy import create_engine, Column, String, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import text

from ..db import Base


class User(Base):
    __tablename__ = 'Users'

    uuid = Column(UUID(as_uuid=True), default=text('uuid()'), primary_key=True, nullable=False, comment='Unique User ID')
    password = Column(String(128), nullable=False, comment='User\'s password hash')
    email = Column(String(80), nullable=False, comment='Users\'s email')

    __table_args__ = (
        UniqueConstraint('email', name='Users_email_unique'),
        {'comment': 'Users'}
    )