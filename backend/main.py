from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import match
import uvicorn
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="CrickIntel AI API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
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
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
