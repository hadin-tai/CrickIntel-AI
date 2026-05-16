import React from 'react'
import { Sparkles, Loader2, Zap, Target, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import Badge from '../ui/Badge'

const AIInsights = ({ insights, loading }) => {
  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <Sparkles className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-secondary animate-pulse" />
      </div>
      <div className="text-center">
        <p className="font-black uppercase tracking-widest text-sm">Reasoning Engine Active</p>
        <p className="text-xs text-muted-foreground mt-1">Generating match narratives...</p>
      </div>
    </div>
  )

  if (!insights) return (
    <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
        <Sparkles className="w-8 h-8 text-primary opacity-20" />
      </div>
      <div>
        <p className="font-bold text-muted-foreground">No analysis generated yet.</p>
        <p className="text-xs text-muted-foreground/50 mt-1 max-w-[200px]">Click refresh to trigger the AI Agentic workflow.</p>
      </div>
    </div>
  )

  // Split insights by points if possible for better UI
  const points = insights.split('\n').filter(p => p.trim())

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="ai">Analysis Summary</Badge>
        <div className="h-[1px] flex-1 bg-white/10" />
      </div>

      <div className="space-y-4">
        {points.map((point, idx) => {
          const isHeading = point.includes('Turning Point') || point.includes('Why') || point.includes('Summary');
          
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-xl border border-white/5 ${isHeading ? 'bg-primary/5 border-primary/10' : 'bg-white/[0.02]'}`}
            >
              <div className="flex gap-3">
                {isHeading ? (
                  <Zap size={16} className="text-primary shrink-0 mt-1" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-2" />
                )}
                <p className={`text-sm leading-relaxed ${isHeading ? 'font-black text-foreground uppercase tracking-tight' : 'text-muted-foreground font-medium'}`}>
                  {point.replace(/[*#]/g, '')}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Target size={14} className="text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest">Key Takeaway</span>
        </div>
        <p className="text-xs font-bold text-muted-foreground leading-relaxed italic">
          "This match was defined by strategic bowling changes in the middle overs, leading to a significant momentum shift."
        </p>
      </div>
    </motion.div>
  )
}

export default AIInsights
