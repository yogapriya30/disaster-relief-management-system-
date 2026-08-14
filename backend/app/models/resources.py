from sqlalchemy import Column, Integer, String
from app.database.base import Base

class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    unit = Column(String)
    location = Column(String)