from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.schemas.relief_camp_schema import ReliefCampCreate
from app.services.relief_camp_service import (
    get_relief_camps,
    get_relief_camp_by_id,
    create_relief_camp,
    update_relief_camp,
    delete_relief_camp
)
router = APIRouter(prefix="/relief-camps", tags=["relief_camps"])
@router.get("/")
def read_relief_camps(db: Session = Depends(get_db)):
    return get_relief_camps(db)
@router.post("/", status_code=status.HTTP_201_CREATED)
def create_new_relief_camp(
    camp: ReliefCampCreate,
    db: Session = Depends(get_db)
):
    return create_relief_camp(db, camp)
@router.get("/{camp_id}")
def read_relief_camp(
    camp_id: int,
    db: Session = Depends(get_db)
):
    camp = get_relief_camp_by_id(db, camp_id)
    if camp is None:
        raise HTTPException(
            status_code=404,
            detail="Relief camp not found"
        )
    return camp
@router.put("/{camp_id}")
def update_existing_relief_camp(
    camp_id: int,
    camp: ReliefCampCreate,
    db: Session = Depends(get_db)
):
    updated_camp = update_relief_camp(db, camp_id, camp)
    if updated_camp is None:
        raise HTTPException(
            status_code=404,
            detail="Relief camp not found"
        )
    return updated_camp
@router.delete("/{camp_id}")
def delete_existing_relief_camp(
    camp_id: int,
    db: Session = Depends(get_db)
):
    deleted_camp = delete_relief_camp(db, camp_id)

    if deleted_camp is None:
        raise HTTPException(
            status_code=404,
            detail="Relief camp not found"
        )

    return {"message": "Relief camp deleted successfully"}