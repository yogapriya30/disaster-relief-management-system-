from sqlalchemy import Column, Integer, String
from app.database.base import Base
class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    status = Column(String)
    assigned_to = Column(String)