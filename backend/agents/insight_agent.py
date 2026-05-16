import os
from crewai import Agent, Task, Crew, Process
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv

load_dotenv()

def get_llm():
    return ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=os.getenv("GOOGLE_API_KEY")
    )

class CricketInsightAgents:
    def __init__(self):
        self.llm = get_llm()

    def match_analyst_agent(self):
        return Agent(
            role='Senior Cricket Match Analyst',
            goal='Provide deep insights into match turning points and team performance based on provided stats.',
            backstory='You are a world-class cricket analyst with decades of experience. You can spot trends and momentum shifts that others miss.',
            llm=self.llm,
            verbose=True,
            allow_delegation=False
        )

    def fan_engagement_agent(self):
        return Agent(
            role='Cricket Fan Engagement Specialist',
            goal='Explain complex cricket statistics in a fun, engaging, and easy-to-understand way for fans.',
            backstory='You love cricket and know how to make it exciting for everyone, from hardcore fans to newcomers.',
            llm=self.llm,
            verbose=True,
            allow_delegation=False
        )

def generate_ai_insights(match_summary):
    agents = CricketInsightAgents()
    analyst = agents.match_analyst_agent()
    fan_specialist = agents.fan_engagement_agent()

    # Task for deep analysis
    analysis_task = Task(
        description=f"""
        Analyze the following match summary and identify the top 3 turning points of the match.
        Explain WHY the winning team won and where the losing team lost momentum.
        
        Match Summary:
        {match_summary}
        """,
        agent=analyst,
        expected_output="A detailed analysis of the match including 3 key turning points and a summary of why the match ended the way it did."
    )

    # Task for fan-friendly explanation
    fan_task = Task(
        description=f"""
        Based on the match analysis, create a fan-friendly summary.
        Use exciting language and emojis. Focus on player impact and momentum swings.
        
        Match Summary:
        {match_summary}
        """,
        agent=fan_specialist,
        expected_output="An engaging, fan-friendly summary of the match with emojis and highlights."
    )

    crew = Crew(
        agents=[analyst, fan_specialist],
        tasks=[analysis_task, fan_task],
        process=Process.sequential
    )

    result = crew.kickoff()
    return result
