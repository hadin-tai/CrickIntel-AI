import React from 'react'

const BattingTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 font-bold text-muted-foreground">Batter</th>
            <th className="text-right py-2 font-bold text-muted-foreground">R</th>
            <th className="text-right py-2 font-bold text-muted-foreground">B</th>
            <th className="text-right py-2 font-bold text-muted-foreground">4s</th>
            <th className="text-right py-2 font-bold text-muted-foreground">6s</th>
            <th className="text-right py-2 font-bold text-muted-foreground">SR</th>
          </tr>
        </thead>
        <tbody>
          {data.map((player, idx) => (
            <tr key={idx} className="border-b border-border/50 hover:bg-accent/50 transition-colors">
              <td className="py-2 font-medium">{player.name}</td>
              <td className="text-right py-2">{player.runs}</td>
              <td className="text-right py-2">{player.balls}</td>
              <td className="text-right py-2">{player.fours}</td>
              <td className="text-right py-2">{player.sixes}</td>
              <td className="text-right py-2 text-primary font-bold">{player.strike_rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BattingTable
