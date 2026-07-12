from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    email: str
    name: str
    role: str = "user"

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class MetricBase(BaseModel):
    key: str
    value: float
    unit: Optional[str] = None
    trend: Optional[float] = None
    status: str = "neutral"

class MetricResponse(MetricBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True

class CarbonDataPointBase(BaseModel):
    month: str
    scope1: float
    scope2: float
    scope3: float
    target: Optional[float] = None

class CarbonDataPointResponse(CarbonDataPointBase):
    id: int

    class Config:
        from_attributes = True

class DepartmentRankingBase(BaseModel):
    rank: int
    department: str
    score: float
    trend: str = "stable"
    change: float = 0.0

class DepartmentRankingResponse(DepartmentRankingBase):
    id: int

    class Config:
        from_attributes = True

class ActivityEventBase(BaseModel):
    type: str
    title: str
    description: str
    actor: Optional[str] = None

class ActivityEventResponse(ActivityEventBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True

class RecommendationBase(BaseModel):
    title: str
    description: str
    priority: str = "medium"
    estimated_esg_gain: float = 0.0
    estimated_carbon_reduction: Optional[float] = None
    effort: str = "medium"
    status: str = "open"

class RecommendationResponse(RecommendationBase):
    id: int

    class Config:
        from_attributes = True

class ComplianceAlertBase(BaseModel):
    title: str
    framework: str
    severity: str = "medium"
    due_date: datetime
    owner: str
    status: str = "open"

class ComplianceAlertResponse(ComplianceAlertBase):
    id: int

    class Config:
        from_attributes = True

# Copilot Schemas
class CopilotMessage(BaseModel):
    role: str # "user" or "ai"
    content: str

class CopilotChatRequest(BaseModel):
    message: str
    history: List[CopilotMessage] = []

class CopilotChatResponse(BaseModel):
    content: str
    confidence: int
    timestamp: datetime
