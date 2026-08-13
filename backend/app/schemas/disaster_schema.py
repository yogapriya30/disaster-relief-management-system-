from pydantic import BaseModel
from typing import Optional
class DisasterCreate(BaseModel):
    title: str
    description: str
    location: str
    status: Optional[str] = "active"