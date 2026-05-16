import React from 'react'
import { Sparkles, Loader2 } from 'lucide-react'

const AIInsights = ({ insights, loading }) => {
  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <p>CrickIntel AI is analyzing the match...</p>
    </div>
  )

  if (!insights) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground text-center">
      <Sparkles className="w-8 h-8 text-primary opacity-20" />
      <p>Click "Generate" to get AI match analysis.</p>
    </div>
  )

  return (
    <div className="prose prose-invert max-w-none">
      <div className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground bg-accent/30 p-4 rounded-xl border border-border">
        {insights}
      </div>
    </div>
  )
}

export default AIInsights
