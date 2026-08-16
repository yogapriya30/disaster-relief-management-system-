from sqlalchemy import Column, Integer, String
from app.database.base import Base

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True, index=True)
    message = Column(String, nullable=False)
    recipient = Column(String)
    status = Column(String)
    user_id = Column(Integer)