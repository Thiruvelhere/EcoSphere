from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

from models.base import BaseModel


class Department(BaseModel):
    __tablename__ = "departments"

    name = Column(String(255), nullable=False)

    organization_id = Column(
        Integer,
        ForeignKey("organizations.id", ondelete="CASCADE"),
        nullable=False
    )

    organization = relationship(
        "Organization",
        back_populates="departments"
    )

    employees = relationship(
        "Employee",
        back_populates="department",
        cascade="all, delete-orphan"
    )

    purchases = relationship(
        "Purchase",
        back_populates="department",
        cascade="all, delete-orphan"
    )
    