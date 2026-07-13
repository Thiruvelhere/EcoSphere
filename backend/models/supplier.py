from sqlalchemy import Column, String, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

from models.base import BaseModel


class Supplier(BaseModel):
    __tablename__ = "suppliers"

    name = Column(String(255), nullable=False)
    country = Column(String(100), nullable=False)
    category = Column(String(100), nullable=False)
    contact_email = Column(String(255), unique=True, nullable=False)
    contact_phone = Column(String(20), nullable=True)
    risk_score = Column(Float, default=0.0, nullable=False)

    organization_id = Column(
        Integer,
        ForeignKey("organizations.id", ondelete="CASCADE"),
        nullable=False,
    )

    # Parent Relationship
    organization = relationship(
        "Organization",
        back_populates="suppliers",
    )

    # Child Relationship 
    purchases = relationship(
        "Purchase",
        back_populates="supplier",
        cascade="all, delete-orphan",
    )