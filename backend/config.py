import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost:5432/ecosphere")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "ecosphere-secret")
    PROJECT_NAME: str = "EcoSphere"
    API_PREFIX: str = "/api/v1"

settings = Settings()
