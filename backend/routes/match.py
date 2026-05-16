from fastapi import APIRouter, UploadFile, File, HTTPException
import json
import traceback
from analytics.summary import generate_match_summary
from agents.insight_agent import generate_ai_insights
from agents.commentary_agent import generate_ai_commentary
from agents.chatbot_agent import chat_with_fan
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
    print(f"\n[UPLOAD] Received file: {file.filename}")
    try:
        contents = await file.read()
        print(f"[UPLOAD] File size: {len(contents)} bytes")
        
        data = json.loads(contents)
        print("[UPLOAD] JSON parsed successfully")
        
        current_match_data = data
        
        print("[ANALYTICS] Starting Deterministic Engine...")
        current_match_summary = generate_match_summary(data)
        
        # Log summary keys for verification
        print(f"[ANALYTICS] Complete. Keys generated: {list(current_match_summary.keys())}")
        if 'innings' in current_match_summary:
            print(f"[ANALYTICS] Processed {len(current_match_summary['innings'])} innings")
        
        return {"message": "Match uploaded and processed successfully", "summary": current_match_summary}
    except Exception as e:
        print(f"[ERROR] Upload/Processing failed: {str(e)}")
        traceback.print_exc()
        raise HTTPException(status_code=400, detail=f"Error processing file: {str(e)}")

@router.get("/analyze-match")
async def analyze_match():
    print("\n[AI] AI Insight request received")
    if not current_match_summary:
        print("[AI] ERROR: No match data found in memory")
        raise HTTPException(status_code=404, detail="No match data found. Please upload first.")
    
    try:
        print("[AI] Calling CrewAI agents for deep analysis...")
        insights = generate_ai_insights(current_match_summary)
        print("[AI] Insights generated successfully")
        return {"insights": str(insights)}
    except Exception as e:
        print(f"[ERROR] AI Analysis failed: {str(e)}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chat")
async def chat(request: ChatRequest):
    print(f"\n[CHAT] Fan question received: {request.question}")
    if not current_match_summary:
        print("[CHAT] ERROR: No match data found in memory")
        raise HTTPException(status_code=404, detail="No match data found. Please upload first.")
    
    try:
        print("[CHAT] Requesting fast response from Groq...")
        response = chat_with_fan(request.question, current_match_summary)
        print("[CHAT] Response received")
        return {"response": response}
    except Exception as e:
        print(f"[ERROR] Chat failed: {str(e)}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

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
