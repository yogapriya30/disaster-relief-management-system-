from sqlalchemy.orm import Session
from app.models.notification import Notification
from app.schemas.notification_schema import NotificationCreate

def get_notifications(db: Session):
    return db.query(Notification).all()

def get_notification_by_id(db: Session, notification_id: int):
    return db.query(Notification).filter(Notification.id == notification_id).first()

def create_notification(db: Session, notification: NotificationCreate):
    new_notification = Notification(
        message=notification.message,
        recipient=notification.recipient,
        user_id=notification.user_id
    )
    db.add(new_notification)
    db.commit()
    db.refresh(new_notification)
    return new_notification

def update_notification(db: Session, notification_id: int, notification_data: NotificationCreate):
    notification = db.query(Notification).filter(Notification.id == notification_id).first()
    if not notification:
        return None
    notification.message = notification_data.message
    notification.recipient = notification_data.recipient
    notification.user_id = notification_data.user_id
    db.commit()
    db.refresh(notification)
    return notification

def delete_notification(db: Session, notification_id: int):
    notification = db.query(Notification).filter(Notification.id == notification_id).first()
    if not notification:
        return None
    db.delete(notification)
    db.commit()
    return notification