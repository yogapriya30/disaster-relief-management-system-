from pydantic import BaseModel
from typing import Optional
class TaskCreate(BaseModel):
    title: str
    status: Optional[str] = "pending"
    assigned_to: Optional[int] = None