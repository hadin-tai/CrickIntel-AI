import React from 'react'
import { Target, Users, Zap } from 'lucide-react'

const SummaryCards = ({ summary }) => {
  const inn1 = summary.innings[0]
  const inn2 = summary.innings[1]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
        <div className="flex items-center gap-3 mb-2">
          <Target className="text-primary" />
          <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Match Result</h4>
        </div>
        <p className="text-2xl font-black">
          {summary.match_info.outcome.winner} won by {summary.match_info.outcome.by.wickets || summary.match_info.outcome.by.runs} {summary.match_info.outcome.by.wickets ? 'wickets' : 'runs'}
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-accent border border-border">
        <div className="flex items-center gap-3 mb-2">
          <Users className="text-primary" />
          <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Top Score</h4>
        </div>
        <p className="text-2xl font-black">
          {inn1.team}: {inn1.total_score}/{inn1.total_wickets}
        </p>
        <p className="text-lg font-bold text-muted-foreground">
          {inn2?.team}: {inn2?.total_score}/{inn2?.total_wickets}
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-accent border border-border">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="text-primary" />
          <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Player of Match</h4>
        </div>
        <p className="text-2xl font-black">
          {summary.match_info.player_of_match[0]}
        </p>
      </div>
    </div>
  )
}

export default SummaryCards
