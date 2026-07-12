from sqlalchemy.orm import Session
from models.models import Metric, CarbonDataPoint, DepartmentRanking, ActivityEvent, Recommendation, ComplianceAlert
import datetime

def seed_database_if_empty(db: Session):
    # Check if we already have metrics seeded
    if db.query(Metric).first() is not None:
        return

    # Seed Metrics
    metrics = [
        Metric(key="esg_score", value=78.4, unit="/ 100", trend=3.2, status="positive"),
        Metric(key="carbon_emissions", value=12400, unit="tCO2e", trend=-8.6, status="positive"),
        Metric(key="social_score", value=84.1, unit="pts", trend=1.4, status="positive"),
        Metric(key="governance_index", value=71.0, unit="pts", trend=-2.1, status="warning"),
    ]
    db.add_all(metrics)

    # Seed Carbon data
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    carbon_data = [
        CarbonDataPoint(month="Jan", scope1=4200, scope2=2800, scope3=8100, target=9000),
        CarbonDataPoint(month="Feb", scope1=3900, scope2=2600, scope3=7800, target=9000),
        CarbonDataPoint(month="Mar", scope1=4100, scope2=2750, scope3=8200, target=9000),
        CarbonDataPoint(month="Apr", scope1=3700, scope2=2500, scope3=7500, target=9000),
        CarbonDataPoint(month="May", scope1=3500, scope2=2400, scope3=7200, target=9000),
        CarbonDataPoint(month="Jun", scope1=3300, scope2=2200, scope3=6900, target=9000),
    ]
    db.add_all(carbon_data)

    # Seed Dept rankings
    depts = [
        DepartmentRanking(rank=1, department="Engineering", score=92, trend="up", change=4),
        DepartmentRanking(rank=2, department="Operations", score=88, trend="up", change=2),
        DepartmentRanking(rank=3, department="Finance", score=81, trend="stable", change=0),
        DepartmentRanking(rank=4, department="Marketing", score=76, trend="down", change=-3),
        DepartmentRanking(rank=5, department="Logistics", score=69, trend="up", change=1),
    ]
    db.add_all(depts)

    # Seed Activities
    activities = [
        ActivityEvent(type="carbon", title="Carbon offset verified", description="Gold Standard certification issued for Q2 reforestation project.", actor="Valery S.", timestamp=datetime.datetime.utcnow() - datetime.timedelta(minutes=15)),
        ActivityEvent(type="compliance", title="CSRD disclosure submitted", description="FY2025 CSRD report submitted to European regulatory portal.", actor="James L.", timestamp=datetime.datetime.utcnow() - datetime.timedelta(hours=2)),
        ActivityEvent(type="ai", title="AI Copilot insight generated", description="New high-severity supply chain risk pattern detected in Tier 2 vendors.", timestamp=datetime.datetime.utcnow() - datetime.timedelta(hours=4)),
    ]
    db.add_all(activities)

    # Seed Recommendations
    recs = [
        Recommendation(title="Switch logistics fleet to EVs", description="Transitioning the last 30% of the logistics fleet to electric vehicles before Q4.", priority="high", estimated_esg_gain=14, estimated_carbon_reduction=320, effort="high", status="open"),
        Recommendation(title="Implement supplier ESG scorecard", description="Deploy structured ESG questionnaires to all Tier 1 & Tier 2 suppliers.", priority="medium", estimated_esg_gain=8, estimated_carbon_reduction=140, effort="medium", status="open"),
        Recommendation(title="Introduce employee green commute subsidy", description="Launch a public-transport subsidy program across all office locations.", priority="low", estimated_esg_gain=4, effort="low", status="open"),
    ]
    db.add_all(recs)

    # Seed Compliance Alerts
    alerts = [
        ComplianceAlert(title="TCFD Climate Risk Disclosure", framework="TCFD", severity="critical", due_date=datetime.datetime.utcnow() + datetime.timedelta(days=7), owner="Valery S.", status="open"),
        ComplianceAlert(title="GRI 302 Energy Consumption Report", framework="GRI", severity="high", due_date=datetime.datetime.utcnow() + datetime.timedelta(days=14), owner="James L.", status="in-progress"),
        ComplianceAlert(title="SASB Supply Chain Disclosure", framework="SASB", severity="medium", due_date=datetime.datetime.utcnow() - datetime.timedelta(days=2), owner="Priya M.", status="overdue"),
    ]
    db.add_all(alerts)

    db.commit()
