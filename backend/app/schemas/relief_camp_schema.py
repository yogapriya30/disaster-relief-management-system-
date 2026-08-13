from pydantic import BaseModel
from typing import Optional
class ReliefCampCreate(BaseModel):
    name: str
    location: Optional[str] = None
    capacity: Optional[int] = None