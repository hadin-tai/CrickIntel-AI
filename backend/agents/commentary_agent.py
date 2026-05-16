import os
from crewai import Agent, Task, Crew
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv

load_dotenv()

def get_llm():
    return ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=os.getenv("GOOGLE_API_KEY")
    )

def generate_ai_commentary(over_data):
    llm = get_llm()
    
    commentator = Agent(
        role='Professional Cricket Commentator',
        goal='Generate exciting, ball-by-ball style commentary for a specific over.',
        backstory='You are known for your energetic and descriptive commentary style, like Ravi Shastri or Ian Bishop.',
        llm=llm,
        verbose=True
    )

    task = Task(
        description=f"""
        Generate an exciting commentary summary for this over. 
        Highlight the key moments, boundaries, or wickets.
        
        Over Data:
        {over_data}
        """,
        agent=commentator,
        expected_output="A high-energy commentary paragraph summarizing the over's action."
    )

    crew = Crew(agents=[commentator], tasks=[task])
    return crew.kickoff()
