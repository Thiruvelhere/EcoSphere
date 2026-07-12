from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base, SessionLocal
from config import settings
from api.routes import router as api_router
from services.seeder import seed_database_if_empty

# Create tables in Database on startup
Base.metadata.create_all(bind=engine)

# Seed database with initial dataset
db = SessionLocal()
try:
    seed_database_if_empty(db)
finally:
    db.close()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="Enterprise ESG Intelligence Platform API Services"
)

# Enable CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API router
app.include_router(api_router, prefix=settings.API_PREFIX)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": f"Welcome to {settings.PROJECT_NAME} Enterprise API Services",
        "docs": "/docs"
    }