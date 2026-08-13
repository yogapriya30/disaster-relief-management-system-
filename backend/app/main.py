from fastapi import FastAPI

from app.database.base import Base
from app.database.connection import engine

from app.api.v1.routers.user import router as user_router
from app.api.v1.routers.disasters import router as disasters_router
from app.api.v1.routers.volunteer import router as volunteer_router
from app.api.v1.routers.relief_camp import router as relief_camp_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(user_router)
app.include_router(disasters_router)
app.include_router(volunteer_router)
app.include_router(relief_camp_router)

@app.get("/")
def home():
    return {"message": "AI Disaster Relief API"}