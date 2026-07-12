from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.exc import OperationalError
from config import settings
import logging

Base = declarative_base()

try:
    # Try connecting to the primary PostgreSQL database url
    engine = create_engine(settings.DATABASE_URL)
    # Check connection quickly
    with engine.connect() as conn:
        pass
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
except Exception:
    # Fallback to local SQLite database when Postgres is not available
    print("PostgreSQL connection failed. Falling back to local SQLite database.")
    sqlite_url = "sqlite:///./ecosphere.db"
    engine = create_engine(sqlite_url, connect_args={"check_same_thread": False})
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
