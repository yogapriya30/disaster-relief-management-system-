from sqlalchemy.orm import Session
from app.models.task import Task
from app.schemas.task_schema import TaskCreate

def get_tasks(db: Session):
    return db.query(Task).all()

def get_task_by_id(db: Session, task_id: int):
    return db.query(Task).filter(Task.id == task_id).first()

def create_task(db: Session, task: TaskCreate):
    new_task = Task(
        title=task.title,
        status=task.status,
        assigned_to=task.assigned_to
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

def update_task(db: Session, task_id: int, task_data: TaskCreate):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        return None
    task.title = task_data.title
    task.status = task_data.status
    task.assigned_to = task_data.assigned_to
    db.commit()
    db.refresh(task)
    return task

def delete_task(db: Session, task_id: int):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        return None
    db.delete(task)
    db.commit()
    return task