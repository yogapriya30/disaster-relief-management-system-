from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.schemas.notification_schema import NotificationCreate
from app.services.notification_service import get_notifications, get_notification_by_id, create_notification, update_notification, delete_notification

router = APIRouter(prefix="/notifications", tags=["notifications"])

@router.get("/")
def read_notifications(db: Session = Depends(get_db)):
    return get_notifications(db)

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_new_notification(notification: NotificationCreate, db: Session = Depends(get_db)):
    return create_notification(db=db, notification=notification)

@router.get("/{notification_id}")
def read_notification(notification_id: int, db: Session = Depends(get_db)):
    notification = get_notification_by_id(db, notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return notification

@router.put("/{notification_id}")
def update_existing_notification(notification_id: int, notification: NotificationCreate, db: Session = Depends(get_db)):
    updated = update_notification(db, notification_id, notification)
    if not updated:
        raise HTTPException(status_code=404, detail="Notification not found")
    return updated

@router.delete("/{notification_id}")
def delete_existing_notification(notification_id: int, db: Session = Depends(get_db)):
    deleted = delete_notification(db, notification_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Notification not found")
    return {"message": "Notification deleted successfully"}