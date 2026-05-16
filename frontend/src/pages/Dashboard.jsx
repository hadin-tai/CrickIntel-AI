import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMatchAnalysis } from '../api'
import SummaryCards from '../components/dashboard/SummaryCards'
import MomentumChart from '../components/charts/MomentumChart'
import BattingTable from '../components/dashboard/BattingTable'
import AIInsights from '../components/dashboard/AIInsights'
import ChatbotPanel from '../components/chatbot/ChatbotPanel'
import { Trophy, ArrowLeft, Loader2 } from 'lucide-react'

const Dashboard = () => {
  const [summary, setSummary] = useState(null)
  const [aiInsights, setAiInsights] = useState('')
  const [loadingInsights, setLoadingInsights] = useState(false)

  useEffect(() => {
    const storedSummary = localStorage.getItem('matchSummary')
    if (storedSummary) {
      setSummary(JSON.parse(storedSummary))
    }
  }, [])

  const fetchAIInsights = async () => {
    setLoadingInsights(true)
    try {
      const response = await getMatchAnalysis()
      setAiInsights(response.data.insights)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingInsights(false)
    }
  }

  if (!summary) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="mb-4">No match data found.</p>
      <Link to="/upload" className="text-primary hover:underline">Go to Upload</Link>
    </div>
  )

  return (
    <div className="min-h-screen p-6 max-w-[1600px] mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/upload" className="p-2 hover:bg-accent rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Trophy className="text-primary" />
            Match Analytics
          </h1>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground font-medium">{summary.match_info.venue}</p>
          <p className="text-sm text-muted-foreground">{summary.match_info.city}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Main Stats */}
        <div className="lg:col-span-3 space-y-6">
          <SummaryCards summary={summary} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="text-xl font-bold mb-4">Innings 1 Momentum</h3>
              <MomentumChart data={summary.innings[0].momentum} />
            </div>
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="text-xl font-bold mb-4">Innings 2 Momentum</h3>
              <MomentumChart data={summary.innings[1]?.momentum || []} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="text-xl font-bold mb-4">{summary.innings[0].team} Batting</h3>
              <BattingTable data={summary.innings[0].batting} />
            </div>
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="text-xl font-bold mb-4">{summary.innings[1]?.team} Batting</h3>
              <BattingTable data={summary.innings[1]?.batting || []} />
            </div>
          </div>
        </div>

        {/* Right Column - AI Insights & Chat */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-border bg-card min-h-[400px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">AI Insights</h3>
              <button 
                onClick={fetchAIInsights}
                disabled={loadingInsights}
                className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded-full font-bold disabled:opacity-50"
              >
                {loadingInsights ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Regenerate'}
              </button>
            </div>
            <AIInsights insights={aiInsights} loading={loadingInsights} />
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card">
            <h3 className="text-xl font-bold mb-4">Ask CrickIntel AI</h3>
            <ChatbotPanel matchSummary={summary} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
