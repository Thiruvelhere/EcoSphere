from sqlalchemy import (
    Column,
    String,
    Integer,
    Float,
    ForeignKey,
    DateTime,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from models.base import BaseModel


class CarbonTransaction(BaseModel):
    __tablename__ = "carbon_transactions"

    purchase_id = Column(
        Integer,
        ForeignKey("purchases.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )

    scope = Column(
        String(20),
        nullable=False,
    )

    emission_value = Column(
        Float,
        nullable=False,
    )

    emission_unit = Column(
        String(20),
        nullable=False,
        default="kg CO₂e",
    )

    calculation_method = Column(
        String(100),
        nullable=False,
        default="Emission Factor Method",
    )

    calculated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    purchase = relationship(
        "Purchase",
        back_populates="carbon_transaction",
    )