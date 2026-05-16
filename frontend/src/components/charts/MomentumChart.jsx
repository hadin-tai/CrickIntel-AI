import React from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const MomentumChart = ({ data = [], color = "#00f2ff" }) => {

  if (!data || data.length === 0) {
    console.warn("[FRONTEND] No data provided to MomentumChart")

    return (
      <div className="h-[280px] w-full flex items-center justify-center border border-white/5 rounded-xl bg-white/[0.02]">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          No Momentum Data
        </p>
      </div>
    )
  }

  console.log(`[FRONTEND] Rendering MomentumChart with ${data.length} data points`)

  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id="momentumGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={color}
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor={color}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#ffffff05"
          />

          <XAxis
            dataKey="over"
            stroke="#ffffff20"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            dy={10}
          />

          <YAxis
            stroke="#ffffff20"
            fontSize={10}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              fontSize: '12px',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)',
            }}
            itemStyle={{
              color: '#fff',
              fontWeight: 'bold',
            }}
            cursor={{
              stroke: color,
              strokeWidth: 1,
              strokeDasharray: '5 5',
            }}
          />

          <Area
            type="monotone"
            dataKey="cumulative_runs"
            stroke={color}
            fillOpacity={1}
            fill="url(#momentumGradient)"
            strokeWidth={3}
            animationDuration={2000}
          />

          {/* Dot for wickets could be added here if needed */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MomentumChart