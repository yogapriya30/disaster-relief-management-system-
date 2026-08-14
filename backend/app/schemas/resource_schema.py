from pydantic import BaseModel
from typing import Optional

class ResourceCreate(BaseModel):
    name: str
    quantity: int
    unit: Optional[str] = None
    location: Optional[str] = None