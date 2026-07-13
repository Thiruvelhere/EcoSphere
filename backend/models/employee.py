from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

from models.base import BaseModel


class Employee(BaseModel):
    __tablename__ = "employees"

    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    job_title = Column(String(100), nullable=False)
    employee_code = Column(String(100), unique=True, nullable=False)

    department_id = Column(
        Integer,
        ForeignKey("departments.id", ondelete="CASCADE"),
        nullable=False,
    )

    department = relationship(
        "Department",
        back_populates="employees",
    )