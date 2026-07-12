from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.models import Metric, CarbonDataPoint, DepartmentRanking, ActivityEvent, Recommendation, ComplianceAlert
from api import schemas
from ai.copilot import CopilotEngine
import datetime

router = APIRouter()

# ── General Metrics ──
@router.get("/metrics", response_model=List[schemas.MetricResponse])
def get_metrics(db: Session = Depends(get_db)):
    return db.query(Metric).all()

# ── Environmental Page APIs ──
@router.get("/carbon-trend", response_model=List[schemas.CarbonDataPointResponse])
def get_carbon_trend(db: Session = Depends(get_db)):
    return db.query(CarbonDataPoint).all()

# ── Department Rankings ──
@router.get("/department-rankings", response_model=List[schemas.DepartmentRankingResponse])
def get_department_rankings(db: Session = Depends(get_db)):
    return db.query(DepartmentRanking).order_by(DepartmentRanking.rank.asc()).all()

# ── Activity Feed ──
@router.get("/activities", response_model=List[schemas.ActivityEventResponse])
def get_activities(db: Session = Depends(get_db)):
    return db.query(ActivityEvent).order_by(ActivityEvent.timestamp.desc()).all()

# ── Recommendations ──
@router.get("/recommendations", response_model=List[schemas.RecommendationResponse])
def get_recommendations(db: Session = Depends(get_db)):
    return db.query(Recommendation).all()

@router.post("/recommendations/{rec_id}/action")
def take_recommendation_action(rec_id: int, db: Session = Depends(get_db)):
    rec = db.query(Recommendation).filter(Recommendation.id == rec_id).first()
    if not rec:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    rec.status = "implemented"
    # Log audit trail action
    activity = ActivityEvent(
        type="report",
        title=f"Action taken: {rec.title}",
        description=f"Action initiated: {rec.description}",
        actor="System Admin"
    )
    db.add(activity)
    db.commit()
    return {"status": "success", "message": f"Recommendation action '{rec.title}' initiated."}

# ── Compliance Alerts ──
@router.get("/compliance-alerts", response_model=List[schemas.ComplianceAlertResponse])
def get_compliance_alerts(db: Session = Depends(get_db)):
    return db.query(ComplianceAlert).all()

# ── AI Copilot ──
@router.post("/copilot/chat", response_model=schemas.CopilotChatResponse)
def copilot_chat(request: schemas.CopilotChatRequest):
    res = CopilotEngine.generate_response(request.message, request.history)
    return schemas.CopilotChatResponse(
        content=res["content"],
        confidence=res["confidence"],
        timestamp=datetime.datetime.utcnow()
    )
