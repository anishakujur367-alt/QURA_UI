from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import case
from fastapi.middleware.cors import CORSMiddleware
from typing import List

import models
import schemas
from database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="QURA MVP API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Qura API. Go to /docs for the interactive API documentation."}

@app.post("/add_patient", response_model=schemas.PatientResponse)
def add_patient(patient: schemas.PatientCreate, db: Session = Depends(get_db)):
    db_patient = models.Patient(name=patient.name, priority=patient.priority.value)
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    
    # Calculate position and wait time
    patients = db.query(models.Patient).filter(models.Patient.status == "Waiting").order_by(
        case(
            (models.Patient.priority == "Emergency", 0),
            else_=1
        ),
        models.Patient.arrival_time.asc()
    ).all()
    
    position = -1
    for idx, p in enumerate(patients):
        if p.id == db_patient.id:
            position = idx
            break
            
    return schemas.PatientResponse(
        id=db_patient.id,
        name=db_patient.name,
        priority=db_patient.priority,
        arrival_time=db_patient.arrival_time,
        status=db_patient.status,
        position=position,
        estimated_wait_time=max(0, position * 15) if position != -1 else 0
    )

@app.get("/queue", response_model=List[schemas.PatientResponse])
def get_queue(db: Session = Depends(get_db)):
    patients = db.query(models.Patient).filter(models.Patient.status == "Waiting").order_by(
        case(
            (models.Patient.priority == "Emergency", 0),
            else_=1
        ),
        models.Patient.arrival_time.asc()
    ).all()
    
    responses = []
    for idx, p in enumerate(patients):
        responses.append(schemas.PatientResponse(
            id=p.id,
            name=p.name,
            priority=p.priority,
            arrival_time=p.arrival_time,
            status=p.status,
            position=idx,
            estimated_wait_time=idx * 15
        ))
    return responses

@app.post("/complete_patient")
def complete_patient(req: schemas.PatientComplete, db: Session = Depends(get_db)):
    patient = db.query(models.Patient).filter(models.Patient.id == req.patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    patient.status = "Completed"
    db.commit()
    return {"message": "Patient completed successfully", "patient_id": patient.id}
