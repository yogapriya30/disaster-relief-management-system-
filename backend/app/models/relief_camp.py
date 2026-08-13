from sqlalchemy import Column, Integer, String
from app.database.base import Base

class ReliefCamp(Base):
    __tablename__ = "relief_camps"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String)
    capacity = Column(Integer)