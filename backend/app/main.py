from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.base import Base
from app.database.connection import engine

from app.api.v1.routers.user import router as user_router
from app.api.v1.routers.disasters import router as disasters_router
from app.api.v1.routers.volunteer import router as volunteer_router
from app.api.v1.routers.relief_camp import router as relief_camp_router
from app.api.v1.routers.resources import router as resources_router
from app.api.v1.routers.task import router as task_router
from app.api.v1.routers.notification import router as notification_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(user_router)
app.include_router(disasters_router)
app.include_router(volunteer_router)
app.include_router(relief_camp_router)
app.include_router(resources_router)
app.include_router(task_router)
app.include_router(notification_router)

@app.get("/")
def home():
    return {"message": "AI Disaster Relief API"}

@app.get("/health")
def health_check():
    return {"status": "OK"}