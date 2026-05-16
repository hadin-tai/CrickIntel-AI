from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import match
import uvicorn
import os
import logging
from dotenv import load_dotenv

# Setup Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger("CrickIntel")

print("\n" + "="*50)
print("[SERVER] Starting CrickIntel AI API")
print("="*50 + "\n")

load_dotenv()

# Verify ENV
gemini_key = os.getenv("GOOGLE_API_KEY")
groq_key = os.getenv("GROQ_API_KEY")

if gemini_key:
    print(f"[ENV] Gemini API key loaded: {gemini_key[:5]}...{gemini_key[-5:]}")
else:
    print("[ENV] WARNING: GOOGLE_API_KEY not found!")

if groq_key:
    print(f"[ENV] Groq API key loaded: {groq_key[:5]}...{groq_key[-5:]}")
else:
    print("[ENV] WARNING: GROQ_API_KEY not found!")

app = FastAPI(title="CrickIntel AI API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(match.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to CrickIntel AI API"}

if __name__ == "__main__":
    print("[SERVER] FastAPI server started successfully on http://localhost:8000")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
