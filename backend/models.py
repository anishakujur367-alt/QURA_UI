from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime, timezone
from database import Base

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    priority = Column(String, default="Normal") # "Normal" or "Emergency"
    arrival_time = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    status = Column(String, default="Waiting") # "Waiting" or "Completed"
