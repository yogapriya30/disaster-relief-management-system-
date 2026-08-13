from sqlalchemy import Column, Integer, String
from app.database.base import Base
class Volunteer(Base):
    __tablename__ = "volunteers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String)
    skill = Column(String)
    status = Column(String)