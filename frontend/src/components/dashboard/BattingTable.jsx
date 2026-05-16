import React from 'react'
import Badge from '../ui/Badge'

const BattingTable = ({ data }) => {
  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5">
            <th className="py-3 px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Batter</th>
            <th className="py-3 px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">R</th>
            <th className="py-3 px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">B</th>
            <th className="py-3 px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">4s</th>
            <th className="py-3 px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">6s</th>
            <th className="py-3 px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">SR</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.02]">
          {data.map((player, idx) => (
            <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
              <td className="py-3 px-2">
                <div className="flex flex-col">
                   <span className="text-sm font-bold group-hover:text-primary transition-colors">{player.name}</span>
                   {player.runs >= 50 && <Badge variant="secondary" className="w-fit mt-1 scale-75 origin-left">Milestone</Badge>}
                </div>
              </td>
              <td className="py-3 px-2 text-sm font-black text-right">{player.runs}</td>
              <td className="py-3 px-2 text-sm text-muted-foreground text-right">{player.balls}</td>
              <td className="py-3 px-2 text-sm text-muted-foreground text-right">{player.fours}</td>
              <td className="py-3 px-2 text-sm text-muted-foreground text-right">{player.sixes}</td>
              <td className="py-3 px-2 text-sm font-black text-primary text-right">{player.strike_rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BattingTable
