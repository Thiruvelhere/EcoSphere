from fastapi import FastAPI

app = FastAPI(
    title="EcoSphere API",
    version="1.0.0"
)

@app.get("/")
def root():
    return {
        "status": "running",
        "message": "Welcome to EcoSphere"
    }