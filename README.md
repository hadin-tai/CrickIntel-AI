# CrickIntel AI - Agentic Cricket Analytics MVP

CrickIntel AI is a production-style MVP that uses a two-layer architecture to provide deep cricket insights. It combines deterministic Python-based analytics with state-of-the-art LLMs (Gemini & Groq) via CrewAI agents.

## 🚀 Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Recharts, Axios
- **Backend**: FastAPI, Python, CrewAI, Pydantic
- **AI Models**: Gemini 1.5 Flash (for deep analysis), Groq Llama 3 (for fast chat)

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- Gemini API Key ([Get it here](https://aistudio.google.com/app/apikey))
- Groq API Key ([Get it here](https://console.groq.com/keys))

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables:
   - Create a `.env` file based on `.env.example`.
   - Add your `GOOGLE_API_KEY` and `GROQ_API_KEY`.
5. Run the server:
   ```bash
   python main.py
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 📊 How to Use
1. Open the frontend (usually `http://localhost:5173`).
2. Go to the **Upload** page.
3. Upload the provided `SampleData.json` file.
4. Explore the **Dashboard**:
   - View deterministic stats (batting, bowling, momentum).
   - Click **Generate** in AI Insights to see Gemini's analysis.
   - Use the **Chatbot** to ask specific questions about the match.

## 🏗️ Architecture
- **Layer 1 (Deterministic)**: `backend/analytics/` processes the raw JSON ball-by-ball data using pure Python logic to calculate stats.
- **Layer 2 (AI Insight)**: `backend/agents/` uses CrewAI to pass the calculated summaries to LLMs, ensuring accuracy and reducing token usage.

## 📁 Project Structure
```
backend/
├── agents/       # CrewAI Agents (Insight, Commentary, Chat)
├── analytics/    # Pure Python analytics logic
├── routes/       # FastAPI endpoints
└── main.py       # API entry point

frontend/
├── src/
│   ├── api/      # Axios API services
│   ├── components/ # Reusable UI components
│   └── pages/     # Main application pages
└── tailwind.config.js
```
