from sqlalchemy.orm import Session
from app.models.relief_camp import ReliefCamp
from app.schemas.relief_camp_schema import ReliefCampCreate
def get_relief_camps(db: Session):
    return db.query(ReliefCamp).all()
def get_relief_camp_by_id(db: Session, camp_id: int):
    return db.query(ReliefCamp).filter(ReliefCamp.id == camp_id).first()
def create_relief_camp(db: Session, camp: ReliefCampCreate):
    new_camp = ReliefCamp(
        name=camp.name,
        location=camp.location,
        capacity=camp.capacity
    )
    db.add(new_camp)
    db.commit()
    db.refresh(new_camp)
    return new_camp
def update_relief_camp(db: Session, camp_id: int, camp_data: ReliefCampCreate):
    camp = db.query(ReliefCamp).filter(ReliefCamp.id == camp_id).first()
    if camp is None:
        return None
    camp.name = camp_data.name
    camp.location = camp_data.location
    camp.capacity = camp_data.capacity
    db.commit()
    db.refresh(camp)
    return camp
def delete_relief_camp(db: Session, camp_id: int):
    camp = db.query(ReliefCamp).filter(ReliefCamp.id == camp_id).first()
    if camp is None:
        return None
    db.delete(camp)
    db.commit()
    return camp