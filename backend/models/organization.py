from sqlalchemy  import Column,String
from sqlalchemy.orm import relationship 

from models.base import BaseModel 

class Organization(BaseModel):
    __tablename__ = 'organizations'

    name = Column(String(255), nullable=False)
    industry = Column(String(100),nullable=False)
    country  = Column(String(255),nullable=False)
    email = Column(String(255),nullable=False,unique=True)
    #relationships
    departments = relationship(
        "Department",
        back_populates="organization",
        cascade="all, delete-orphan",
    )

    suppliers = relationship(
        "Supplier",
        back_populates="organization",
        cascade="all, delete-orphan",
    )
    
        