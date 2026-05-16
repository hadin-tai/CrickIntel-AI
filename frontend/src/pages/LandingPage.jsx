import React from 'react'
import { Link } from 'react-router-dom'
import { Trophy, TrendingUp, MessageSquare, ShieldCheck } from 'lucide-react'

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <header className="mb-12">
        <h1 className="text-6xl font-extrabold tracking-tight text-primary mb-4">
          CrickIntel <span className="text-foreground">AI</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The ultimate agentic AI-powered cricket analytics platform. 
          Transform raw match data into professional insights, commentary, and interactive chats.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 max-w-6xl">
        <FeatureCard 
          icon={<TrendingUp className="w-10 h-10 text-primary" />}
          title="Deterministic Analytics"
          description="Deep-dive into strike rates, economy, momentum, and partnerships with pure logic."
        />
        <FeatureCard 
          icon={<Trophy className="w-10 h-10 text-primary" />}
          title="AI Match Insights"
          description="Powered by Gemini, get expert analysis on why teams won or lost."
        />
        <FeatureCard 
          icon={<MessageSquare className="w-10 h-10 text-primary" />}
          title="Fan Chatbot"
          description="Ask questions and get instant answers about any match moment using Groq."
        />
        <FeatureCard 
          icon={<ShieldCheck className="w-10 h-10 text-primary" />}
          title="Visual Dashboard"
          description="Beautiful charts and timelines to visualize match progression and player impact."
        />
      </div>

      <Link 
        to="/upload" 
        className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-all text-lg shadow-lg shadow-primary/20"
      >
        Get Started - Upload Match Data
      </Link>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors text-left">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
)

export default LandingPage
