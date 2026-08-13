from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.schemas.disaster_schema import DisasterCreate
from app.services.disaster_service import get_disasters, get_disaster_by_id, create_disaster, update_disaster, delete_disaster

router = APIRouter(prefix="/disasters", tags=["disasters"])

@router.get("/")
def read_disasters(db: Session = Depends(get_db)):
    return get_disasters(db)

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_new_disaster(disaster: DisasterCreate, db: Session = Depends(get_db)):
    return create_disaster(db=db, disaster=disaster)

@router.get("/{disaster_id}")
def read_disaster(disaster_id: int, db: Session = Depends(get_db)):
    disaster = get_disaster_by_id(db, disaster_id)
    if not disaster:
        raise HTTPException(status_code=404, detail="Disaster not found")
    return disaster

@router.put("/{disaster_id}")
def update_existing_disaster(disaster_id: int, disaster: DisasterCreate, db: Session = Depends(get_db)):
    updated = update_disaster(db, disaster_id, disaster)
    if not updated:
        raise HTTPException(status_code=404, detail="Disaster not found")
    return updated

@router.delete("/{disaster_id}")
def delete_existing_disaster(disaster_id: int, db: Session = Depends(get_db)):
    deleted = delete_disaster(db, disaster_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Disaster not found")
    return {"message": "Disaster deleted successfully"}