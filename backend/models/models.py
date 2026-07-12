from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
import datetime
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    role = Column(String, default="user")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Metric(Base):
    __tablename__ = "metrics"
    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, index=True, nullable=False) # e.g. "esg_score", "scope_1", "scope_2", "scope_3", "social_score", "governance_index"
    value = Column(Float, nullable=False)
    unit = Column(String, nullable=True)
    trend = Column(Float, nullable=True)
    status = Column(String, default="neutral") # e.g. "positive", "warning", "negative"
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class CarbonDataPoint(Base):
    __tablename__ = "carbon_data_points"
    id = Column(Integer, primary_key=True, index=True)
    month = Column(String, nullable=False)
    scope1 = Column(Float, nullable=False)
    scope2 = Column(Float, nullable=False)
    scope3 = Column(Float, nullable=False)
    target = Column(Float, nullable=True)

class DepartmentRanking(Base):
    __tablename__ = "department_rankings"
    id = Column(Integer, primary_key=True, index=True)
    rank = Column(Integer, nullable=False)
    department = Column(String, nullable=False, unique=True)
    score = Column(Float, nullable=False)
    trend = Column(String, default="stable") # up, down, stable
    change = Column(Float, default=0.0)

class ActivityEvent(Base):
    __tablename__ = "activity_events"
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, nullable=False) # carbon, compliance, social, governance, report, ai
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    actor = Column(String, nullable=True)

class Recommendation(Base):
    __tablename__ = "recommendations"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    priority = Column(String, default="medium") # critical, high, medium, low
    estimated_esg_gain = Column(Float, default=0.0)
    estimated_carbon_reduction = Column(Float, nullable=True)
    effort = Column(String, default="medium") # low, medium, high
    status = Column(String, default="open") # open, implemented, dismissed

class ComplianceAlert(Base):
    __tablename__ = "compliance_alerts"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    framework = Column(String, nullable=False) # TCFD, GRI, CSRD, SASB
    severity = Column(String, default="medium") # critical, high, medium, low
    due_date = Column(DateTime, nullable=False)
    owner = Column(String, nullable=False)
    status = Column(String, default="open") # open, in-progress, overdue, closed
