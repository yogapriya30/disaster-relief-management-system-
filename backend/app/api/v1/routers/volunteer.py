from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.schemas.volunteer_schema import VolunteerCreate
from app.services.volunteer_service import get_volunteers, get_volunteer_by_id, create_volunteer, update_volunteer, delete_volunteer

router = APIRouter(prefix="/volunteers", tags=["volunteers"])

@router.get("/")
def read_volunteers(db: Session = Depends(get_db)):
    return get_volunteers(db)

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_new_volunteer(volunteer: VolunteerCreate, db: Session = Depends(get_db)):
    return create_volunteer(db=db, volunteer=volunteer)

@router.get("/{volunteer_id}")
def read_volunteer(volunteer_id: int, db: Session = Depends(get_db)):
    volunteer = get_volunteer_by_id(db, volunteer_id)
    if not volunteer:
        raise HTTPException(status_code=404, detail="Volunteer not found")
    return volunteer

@router.put("/{volunteer_id}")
def update_existing_volunteer(volunteer_id: int, volunteer: VolunteerCreate, db: Session = Depends(get_db)):
    updated = update_volunteer(db, volunteer_id, volunteer)
    if not updated:
        raise HTTPException(status_code=404, detail="Volunteer not found")
    return updated

@router.delete("/{volunteer_id}")
def delete_existing_volunteer(volunteer_id: int, db: Session = Depends(get_db)):
    deleted = delete_volunteer(db, volunteer_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Volunteer not found")
    return {"message": "Volunteer deleted successfully"}