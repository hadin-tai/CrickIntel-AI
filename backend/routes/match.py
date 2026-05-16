from fastapi import APIRouter, UploadFile, File, HTTPException
import json
from ..analytics.summary import generate_match_summary
from ..agents.insight_agent import generate_ai_insights
from ..agents.commentary_agent import generate_ai_commentary
from ..agents.chatbot_agent import chat_with_fan
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

# In-memory storage for the current match (for MVP)
current_match_data = {}
current_match_summary = {}

class ChatRequest(BaseModel):
    question: str

@router.post("/upload-match")
async def upload_match(file: UploadFile = File(...)):
    global current_match_data, current_match_summary
    try:
        contents = await file.read()
        data = json.loads(contents)
        current_match_data = data
        current_match_summary = generate_match_summary(data)
        return {"message": "Match uploaded and processed successfully", "summary": current_match_summary}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing file: {str(e)}")

@router.get("/analyze-match")
async def analyze_match():
    if not current_match_summary:
        raise HTTPException(status_code=404, detail="No match data found. Please upload first.")
    
    insights = generate_ai_insights(current_match_summary)
    return {"insights": str(insights)}

@router.post("/chat")
async def chat(request: ChatRequest):
    if not current_match_summary:
        raise HTTPException(status_code=404, detail="No match data found. Please upload first.")
    
    response = chat_with_fan(request.question, current_match_summary)
    return {"response": response}

@router.get("/commentary/{innings_idx}/{over_idx}")
async def get_commentary(innings_idx: int, over_idx: int):
    if not current_match_data:
        raise HTTPException(status_code=404, detail="No match data found. Please upload first.")
    
    try:
        over_data = current_match_data['innings'][innings_idx]['overs'][over_idx]
        commentary = generate_ai_commentary(over_data)
        return {"commentary": str(commentary)}
    except (IndexError, KeyError):
        raise HTTPException(status_code=404, detail="Over not found.")
