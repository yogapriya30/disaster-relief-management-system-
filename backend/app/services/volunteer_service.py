from sqlalchemy.orm import Session
from app.models.volunteer import Volunteer
from app.schemas.volunteer_schema import VolunteerCreate

def get_volunteers(db: Session):
    return db.query(Volunteer).all()

def get_volunteer_by_id(db: Session, volunteer_id: int):
    return db.query(Volunteer).filter(Volunteer.id == volunteer_id).first()

def create_volunteer(db: Session, volunteer: VolunteerCreate):
    new_volunteer = Volunteer(
        name=volunteer.name,
        phone=volunteer.phone,
        skill=volunteer.skill,
        status=volunteer.status
    )
    db.add(new_volunteer)
    db.commit()
    db.refresh(new_volunteer)
    return new_volunteer

def update_volunteer(db: Session, volunteer_id: int, volunteer_data: VolunteerCreate):
    volunteer = db.query(Volunteer).filter(Volunteer.id == volunteer_id).first()
    if not volunteer:
        return None
    volunteer.name = volunteer_data.name
    volunteer.phone = volunteer_data.phone
    volunteer.skill = volunteer_data.skill
    volunteer.status = volunteer_data.status
    db.commit()
    db.refresh(volunteer)
    return volunteer

def delete_volunteer(db: Session, volunteer_id: int):
    volunteer = db.query(Volunteer).filter(Volunteer.id == volunteer_id).first()
    if not volunteer:
        return None
    db.delete(volunteer)
    db.commit()
    return volunteer