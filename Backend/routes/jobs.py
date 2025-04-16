from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Jobs  
from schemas import JobResponse  

router = APIRouter()

@router.get("/recommended_jobs", response_model=list[JobResponse])
def get_all_jobs(db: Session = Depends(get_db)):
    return db.query(Jobs).all()

@router.get("/job_listing/{job_id}", response_model=JobResponse)
def get_job_by_id(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Jobs).filter(Jobs.id_Jobs == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job
