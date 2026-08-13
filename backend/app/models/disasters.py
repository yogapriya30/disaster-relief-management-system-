from sqlalchemy import Column, Integer, String, Text
from app.database.base import Base
class Disaster(Base):
    __tablename__ = "disasters"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    location = Column(String, nullable=False)
    status = Column(String, default="active")