from sqlalchemy.orm import Session
from app.models.resources import Resource
from app.schemas.resource_schema import ResourceCreate

def get_resources(db: Session):
    return db.query(Resource).all()

def get_resource_by_id(db: Session, resource_id: int):
    return db.query(Resource).filter(Resource.id == resource_id).first()

def create_resource(db: Session, resource: ResourceCreate):
    new_resource = Resource(
        name=resource.name,
        quantity=resource.quantity,
        unit=resource.unit,
        location=resource.location
    )
    db.add(new_resource)
    db.commit()
    db.refresh(new_resource)
    return new_resource

def update_resource(db: Session, resource_id: int, resource_data: ResourceCreate):
    resource = db.query(Resource).filter(Resource.id == resource_id).first()
    if not resource:
        return None
    resource.name = resource_data.name
    resource.quantity = resource_data.quantity
    resource.unit = resource_data.unit
    resource.location = resource_data.location
    db.commit()
    db.refresh(resource)
    return resource

def delete_resource(db: Session, resource_id: int):
    resource = db.query(Resource).filter(Resource.id == resource_id).first()
    if not resource:
        return None
    db.delete(resource)
    db.commit()
    return resource