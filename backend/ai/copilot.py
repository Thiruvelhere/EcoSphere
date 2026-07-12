import random
import re
from typing import List
from api.schemas import CopilotMessage

DEMO_RESPONSES = {
    "default": "I've analyzed your ESG data corpus. Based on current trajectory models, I can provide detailed insights on this topic. Would you like me to generate a full report or surface the key data points?",
    "emission": "Your Scope 3 emissions increased by 12.4% in Q2, primarily driven by Tier 2 logistics suppliers in Southeast Asia. Three vendors — TechParts Ltd, AsiaTrade Co., and Maritime Express — account for 67% of the anomaly. I recommend initiating a supplier ESG audit within the next 30 days.",
    "predict": "Based on current performance vectors and your planned EV fleet transition, I project your ESG score will reach 84.2 by next month — up from 78.4 today. Accelerating the CSRD disclosure by 2 weeks could push this to 86.1.",
    "supplier": "I've identified 3 high-risk suppliers based on cross-referencing shipment data, audit scores, and public ESG filings:\n\n1. AsiaTrade Co. — Risk: High (missing Q1 audit, elevated Scope 3)\n2. Maritime Express — Risk: Medium (shipping route through unregulated zones)\n3. GlobalParts Inc. — Risk: Medium (sub-threshold social score)\n\nShall I generate a supplier risk report?",
    "compliance": "You have 2 open compliance issues requiring immediate attention:\n\n1. TCFD Climate Risk Disclosure — due in 7 days, status: Open\n2. SASB Supply Chain Disclosure — due date passed 2 days ago, status: Overdue\n\nI recommend prioritizing the SASB disclosure to avoid regulatory penalties.",
    "department": "Operations department shows the most critical ESG gap: 3,400 tCO2e this quarter vs. a target of 2,800. Contributing factors include a 22% increase in production volume without corresponding efficiency gains. Recommended intervention: deploy process heat recovery systems (estimated −380 tCO2e)."
}

class CopilotEngine:
    @staticmethod
    def generate_response(query: str, history: List[CopilotMessage]) -> dict:
        lower_query = query.lower()
        if any(w in lower_query for w in ["emission", "carbon", "increase", "scope"]):
            content = DEMO_RESPONSES["emission"]
        elif any(w in lower_query for w in ["predict", "forecast", "next month", "projection"]):
            content = DEMO_RESPONSES["predict"]
        elif any(w in lower_query for w in ["supplier", "vendor", "risk"]):
            content = DEMO_RESPONSES["supplier"]
        elif any(w in lower_query for w in ["compliance", "regulation", "audit", "tcfd", "sasb"]):
            content = DEMO_RESPONSES["compliance"]
        elif any(w in lower_query for w in ["department", "attention", "operations"]):
            content = DEMO_RESPONSES["department"]
        else:
            content = DEMO_RESPONSES["default"]

        return {
            "content": content,
            "confidence": random.randint(85, 98)
        }
