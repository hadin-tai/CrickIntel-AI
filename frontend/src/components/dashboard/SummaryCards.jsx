import React from 'react'
import { Target, Users, Zap, TrendingUp, Trophy, Star } from 'lucide-react'
import GlassCard from '../ui/GlassCard'
import Badge from '../ui/Badge'

const SummaryCards = ({ summary }) => {
  const inn1 = summary?.innings?.[0] || { total_score: 0, total_wickets: 0, team: 'N/A' };
  const inn2 = summary?.innings?.[1] || { total_score: 0, total_wickets: 0, team: 'N/A' };
  const matchInfo = summary?.match_info || {};
  const outcome = matchInfo?.outcome || { winner: 'N/A', by: {} };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard 
        icon={<Trophy className="text-primary" size={20} />}
        label="Match Winner"
        value={outcome.winner || 'N/A'}
        subValue={`By ${outcome.by?.wickets || outcome.by?.runs || 0} ${outcome.by?.wickets ? 'wickets' : 'runs'}`}
        variant="primary"
      />
      
      <MetricCard 
        icon={<Target className="text-secondary" size={20} />}
        label="Highest Score"
        value={`${inn1.total_score}/${inn1.total_wickets}`}
        subValue={inn1.team}
        variant="secondary"
      />

      <MetricCard 
        icon={<Star className="text-primary" size={20} />}
        label="Player of Match"
        value={matchInfo.player_of_match?.[0] || 'N/A'}
        subValue="Impact Performance"
      />

      <MetricCard 
        icon={<TrendingUp className="text-secondary" size={20} />}
        label="Total Match Runs"
        value={inn1.total_score + (inn2.total_score || 0)}
        subValue="High Scoring Game"
      />
    </div>
  )
}

const MetricCard = ({ icon, label, value, subValue, variant = 'default' }) => (
  <GlassCard className="relative overflow-hidden group">
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
          {icon}
        </div>
        <Badge variant="outline">Live Stats</Badge>
      </div>
      <div>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">{label}</p>
        <h4 className="text-2xl font-black tracking-tight truncate">{value}</h4>
        <p className="text-xs font-bold text-muted-foreground/60 mt-1 uppercase tracking-tighter">{subValue}</p>
      </div>
    </div>
    {/* Subtle background glow */}
    <div className={`absolute -right-4 -bottom-4 w-24 h-24 blur-[50px] opacity-10 rounded-full ${variant === 'primary' ? 'bg-primary' : variant === 'secondary' ? 'bg-secondary' : 'bg-white'}`} />
  </GlassCard>
)

export default SummaryCards
