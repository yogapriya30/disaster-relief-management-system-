from pydantic import BaseModel
from typing import Optional
class NotificationCreate(BaseModel):
    message: str
    recipient:Optional[str] = None
    user_id: Optional[int] = None