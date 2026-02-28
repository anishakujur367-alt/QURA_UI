from pydantic import BaseModel, ConfigDict
from datetime import datetime
from enum import Enum

class PriorityEnum(str, Enum):
    normal = "Normal"
    emergency = "Emergency"

class PatientCreate(BaseModel):
    name: str
    priority: PriorityEnum

class PatientResponse(BaseModel):
    id: int
    name: str
    priority: str
    arrival_time: datetime
    status: str
    position: int | None = None
    estimated_wait_time: int | None = None

    model_config = ConfigDict(from_attributes=True)

class PatientComplete(BaseModel):
    patient_id: int
