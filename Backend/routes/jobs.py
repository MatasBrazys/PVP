from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Jobs  # Assuming this is your SQLAlchemy model for pvp_jobs
from schemas import JobResponse  # You'll need to create this schema

router = APIRouter()

@router.get("/recommended_jobs", response_model=list[JobResponse])
def get_all_jobs(db: Session = Depends(get_db)):
    return db.query(Jobs).all()