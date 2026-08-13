from sqlalchemy.orm import Session
from app.models.disasters import Disaster
from app.schemas.disaster_schema import DisasterCreate

def get_disasters(db: Session):
    return db.query(Disaster).all()

def get_disaster_by_id(db: Session, disaster_id: int):
    return db.query(Disaster).filter(Disaster.id == disaster_id).first()

def create_disaster(db: Session, disaster: DisasterCreate):
    new_disaster = Disaster(
        title=disaster.title,
        description=disaster.description,
        location=disaster.location,
        status=disaster.status
    )
    db.add(new_disaster)
    db.commit()
    db.refresh(new_disaster)
    return new_disaster

def update_disaster(db: Session, disaster_id: int, disaster_data: DisasterCreate):
    disaster = db.query(Disaster).filter(Disaster.id == disaster_id).first()
    if not disaster:
        return None
    disaster.title = disaster_data.title
    disaster.description = disaster_data.description
    disaster.location = disaster_data.location
    disaster.status = disaster_data.status
    db.commit()
    db.refresh(disaster)
    return disaster

def delete_disaster(db: Session, disaster_id: int):
    disaster = db.query(Disaster).filter(Disaster.id == disaster_id).first()
    if not disaster:
        return None
    db.delete(disaster)
    db.commit()
    return disaster