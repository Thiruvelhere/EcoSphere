from sqlalchemy import (
    Column,
    String,
    Integer,
    Float,
    Date,
    ForeignKey,
)
from sqlalchemy.orm import relationship

from models.base import BaseModel


class Purchase(BaseModel):
    __tablename__ = "purchases"

    material = Column(String(100), nullable=False)
    quantity = Column(Float, nullable=False)
    unit = Column(String(30), nullable=False)

    cost = Column(Float, nullable=False)

    transport_mode = Column(String(50), nullable=False)

    purchase_date = Column(Date, nullable=False)

    status = Column(
        String(50),
        default="Completed",
        nullable=False,
    )

    department_id = Column(
        Integer,
        ForeignKey("departments.id", ondelete="CASCADE"),
        nullable=False,
    )

    supplier_id = Column(
        Integer,
        ForeignKey("suppliers.id", ondelete="CASCADE"),
        nullable=False,
    )

    department = relationship(
        "Department",
        back_populates="purchases",
    )

    supplier = relationship(
        "Supplier",
        back_populates="purchases",
    )
    carbon_transaction = relationship(
        "CarbonTransaction",
        back_populates="purchase",
        uselist=False,
        cascade="all, delete-orphan",
    )
    