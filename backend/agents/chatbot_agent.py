import os
from langchain_groq import ChatGroq
from dotenv import load_dotenv

load_dotenv()

def get_groq_llm():
    return ChatGroq(
        model_name="llama-3.3-70b-versatile",
        groq_api_key=os.getenv("GROQ_API_KEY")
    )

def chat_with_fan(question, match_summary):
    llm = get_groq_llm()
    
    prompt = f"""
    You are 'CrickIntel AI', a friendly and highly knowledgeable cricket expert.
    You have access to the following match analytics:
    {match_summary}
    
    Answer the fan's question based ONLY on the provided analytics.
    If you don't know the answer, say you don't have that data.
    Keep it conversational, professional, and slightly enthusiastic.
    
    Fan Question: {question}
    """
    
    response = llm.invoke(prompt)
    return response.content
