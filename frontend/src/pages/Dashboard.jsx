import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getMatchAnalysis } from '../api'

import SummaryCards from '../components/dashboard/SummaryCards'
import MomentumChart from '../components/charts/MomentumChart'
import BattingTable from '../components/dashboard/BattingTable'
import AIInsights from '../components/dashboard/AIInsights'
import ChatbotPanel from '../components/chatbot/ChatbotPanel'

import {
  Trophy,
  ArrowLeft,
  Loader2,
  Sparkles,
  LayoutDashboard,
  Share2,
  Download,
  MapPin,
  Cpu
} from 'lucide-react'

import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

const Dashboard = () => {
  const [summary, setSummary] = useState(null)
  const [aiInsights, setAiInsights] = useState('')
  const [loadingInsights, setLoadingInsights] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    console.log('[FRONTEND] Dashboard mounting. Checking local storage...')

    const storedSummary = localStorage.getItem('matchSummary')

    if (storedSummary) {
      try {
        const parsed = JSON.parse(storedSummary)

        console.log(
          '[FRONTEND] Dashboard data loaded successfully:',
          parsed.match_info?.teams
        )

        setSummary(parsed)
      } catch (e) {
        console.error('[FRONTEND] Failed to parse stored summary:', e)
        setError('Invalid match data found. Please upload again.')
      }
    } else {
      console.warn(
        '[FRONTEND] No match data found in local storage. Redirecting to upload...'
      )

      navigate('/upload')
    }
  }, [navigate])

  const fetchAIInsights = async () => {
    console.log('[FRONTEND] Requesting AI Insights...')

    setLoadingInsights(true)

    try {
      const response = await getMatchAnalysis()

      console.log('[FRONTEND] AI Insights received')

      setAiInsights(response.data.insights)
    } catch (err) {
      console.error('[FRONTEND] Failed to fetch AI insights:', err)
    } finally {
      setLoadingInsights(false)
    }
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <GlassCard className="p-10 border-destructive/20 bg-destructive/5">
          <h2 className="text-2xl font-black mb-4 text-destructive">
            CRITICAL ERROR
          </h2>

          <p className="text-muted-foreground mb-6">{error}</p>

          <Link to="/upload">
            <Button>Back to Upload</Button>
          </Link>
        </GlassCard>
      </div>
    )
  }

  if (!summary) {
    console.log('[FRONTEND] Summary is null, showing fallback...')

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />

          <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">
            Initializing Match Center...
          </p>
        </div>
      </div>
    )
  }

  console.log('[FRONTEND] Rendering dashboard UI')

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1800px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              to="/upload"
              className="p-2 hover:bg-white/5 rounded-xl transition-colors text-muted-foreground hover:text-primary group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </Link>

            <div className="h-8 w-[1px] bg-white/10" />

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <LayoutDashboard size={16} className="text-primary" />

                <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Match Center
                </span>
              </div>

              <h1 className="text-xl font-black tracking-tight">
                {summary.match_info.teams[0]}
                <span className="text-muted-foreground/50"> vs </span>
                {summary.match_info.teams[1]}
              </h1>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-3 text-sm font-bold text-muted-foreground">
              <MapPin size={16} className="text-primary" />
              {summary.match_info.venue}, {summary.match_info.city}
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="gap-2">
                <Share2 size={16} />
                Share
              </Button>

              <Button variant="outline" size="sm" className="gap-2">
                <Download size={16} />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto p-6 space-y-6">
        {/* Top Metrics Row */}
        <SummaryCards summary={summary} />

        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="xl:col-span-8 space-y-6">
            {/* Momentum Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard className="p-0 overflow-hidden border-white/5">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                  <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                    <Trophy size={14} className="text-primary" />
                    {summary.innings[0].team} Momentum
                  </h3>

                  <Badge variant="outline">
                    {summary.innings[0].total_score}/
                    {summary.innings[0].total_wickets}
                  </Badge>
                </div>

                <div className="p-6">
                  <MomentumChart data={summary.innings[0].momentum} />
                </div>
              </GlassCard>

              <GlassCard className="p-0 overflow-hidden border-white/5">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                  <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                    <Trophy size={14} className="text-secondary" />
                    {summary.innings[1]?.team} Momentum
                  </h3>

                  <Badge variant="outline">
                    {summary.innings[1]?.total_score}/
                    {summary.innings[1]?.total_wickets}
                  </Badge>
                </div>

                <div className="p-6">
                  <MomentumChart
                    data={summary.innings[1]?.momentum || []}
                    color="#10b981"
                  />
                </div>
              </GlassCard>
            </div>

            {/* Batting Tables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard className="p-0 border-white/5">
                <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                  <h3 className="text-sm font-black uppercase tracking-widest">
                    {summary.innings[0].team} Batting
                  </h3>
                </div>

                <div className="p-4">
                  <BattingTable data={summary.innings[0].batting} />
                </div>
              </GlassCard>

              <GlassCard className="p-0 border-white/5">
                <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                  <h3 className="text-sm font-black uppercase tracking-widest">
                    {summary.innings[1]?.team} Batting
                  </h3>
                </div>

                <div className="p-4">
                  <BattingTable
                    data={summary.innings[1]?.batting || []}
                  />
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Right Column */}
          <div className="xl:col-span-4 space-y-6">
            {/* AI Insights */}
            <GlassCard className="p-0 border-primary/20 bg-primary/[0.02] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Sparkles size={120} className="text-primary" />
              </div>

              <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Sparkles size={16} className="text-primary" />
                  </div>

                  <h3 className="text-sm font-black uppercase tracking-widest">
                    AI Intelligence
                  </h3>
                </div>

                <Button
                  onClick={fetchAIInsights}
                  disabled={loadingInsights}
                  variant="outline"
                  size="sm"
                  className="h-8 text-[10px]"
                >
                  {loadingInsights ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    'REFRESH'
                  )}
                </Button>
              </div>

              <div className="p-6">
                <AIInsights
                  insights={aiInsights}
                  loading={loadingInsights}
                />
              </div>
            </GlassCard>

            {/* Chatbot */}
            <GlassCard className="p-0 border-white/5 min-h-[500px] flex flex-col">
              <div className="px-6 py-5 border-b border-white/5 flex items-center gap-3 bg-white/[0.02]">
                <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <Cpu size={16} className="text-secondary" />
                </div>

                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest">
                    CrickIntel Assistant
                  </h3>

                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                    Connected to Groq Llama 3
                  </p>
                </div>
              </div>

              <div className="flex-1 p-6 flex flex-col">
                <ChatbotPanel matchSummary={summary} />
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard