from pydantic import BaseModel
from typing import Optional

class VolunteerCreate(BaseModel):
    name: str
    phone: Optional[str] = None
    skill: Optional[str] = None
    status: Optional[str] = "available"