from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.schemas.resource_schema import ResourceCreate
from app.services.resource_service import get_resources, get_resource_by_id, create_resource, update_resource, delete_resource

router = APIRouter(prefix="/resources", tags=["resources"])

@router.get("/")
def read_resources(db: Session = Depends(get_db)):
    return get_resources(db)

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_new_resource(resource: ResourceCreate, db: Session = Depends(get_db)):
    return create_resource(db=db, resource=resource)

@router.get("/{resource_id}")
def read_resource(resource_id: int, db: Session = Depends(get_db)):
    resource = get_resource_by_id(db, resource_id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    return resource

@router.put("/{resource_id}")
def update_existing_resource(resource_id: int, resource: ResourceCreate, db: Session = Depends(get_db)):
    updated = update_resource(db, resource_id, resource)
    if not updated:
        raise HTTPException(status_code=404, detail="Resource not found")
    return updated

@router.delete("/{resource_id}")
def delete_existing_resource(resource_id: int, db: Session = Depends(get_db)):
    deleted = delete_resource(db, resource_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Resource not found")
    return {"message": "Resource deleted successfully"}