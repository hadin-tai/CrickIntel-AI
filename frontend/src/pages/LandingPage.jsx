import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trophy, TrendingUp, MessageSquare, ShieldCheck, Zap, ArrowRight, Cpu, BarChart3 } from 'lucide-react'
import Button from '../components/ui/Button'
import GlassCard from '../components/ui/GlassCard'
import Badge from '../components/ui/Badge'

const LandingPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] animate-pulse" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-neon">
            <Cpu className="text-black w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter">
            CRICKINTEL <span className="text-primary">AI</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Features</a>
          <a href="#" className="hover:text-primary transition-colors">Architecture</a>
          <a href="#" className="hover:text-primary transition-colors">API</a>
          <Link to="/upload">
            <Button variant="outline" size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-20 pb-32 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="ai" className="mb-6 px-4 py-1.5 text-xs">
            ✨ Next-Gen Agentic Analytics
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
            CRICKET INTELLIGENCE <br />
            <span className="text-gradient">REDEFINED BY AI</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Stop looking at raw numbers. Get professional-grade match insights, momentum detection, and interactive AI commentary powered by advanced agentic workflows.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/upload">
              <Button size="lg" className="w-full md:w-auto shadow-neon">
                Analyze Match Now <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="lg" className="w-full md:w-auto">
              View Demo Dashboard
            </Button>
          </div>
        </motion.div>

        {/* Stats Preview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-24 relative"
        >
          <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10" />
          <GlassCard className="max-w-5xl mx-auto p-2 md:p-4 bg-black/40 border-white/5 overflow-hidden">
            <div className="aspect-video rounded-xl bg-sports-grid bg-[length:30px_30px] flex items-center justify-center relative">
               {/* Mock UI elements */}
               <div className="absolute top-4 left-4 flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/50" />
                 <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                 <div className="w-3 h-3 rounded-full bg-green-500/50" />
               </div>
               <BarChart3 className="w-32 h-32 text-primary/20 animate-pulse" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-8 rounded-3xl bg-black/60 backdrop-blur-xl border border-white/10 text-left max-w-md">
                     <Badge variant="ai" className="mb-4">Match Turning Point Detected</Badge>
                     <h4 className="text-2xl font-bold mb-2">Over 14.3: Momentum Shift</h4>
                     <p className="text-sm text-muted-foreground mb-4">Sunrisers Hyderabad lost 45% win probability after Rashid Khan's wicket. AI suggests bowling depth was the key differentiator.</p>
                     <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-primary" 
                          initial={{ width: 0 }}
                          animate={{ width: '70%' }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                     </div>
                  </div>
               </div>
            </div>
          </GlassCard>
        </motion.div>
      </main>

      {/* Features Grid */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<TrendingUp className="w-8 h-8 text-primary" />}
            title="Deterministic Logic"
            description="Pure Python engine for calculating precise strike rates, economy, and partnerships."
            delay={0.1}
          />
          <FeatureCard 
            icon={<Cpu className="w-8 h-8 text-secondary" />}
            title="Agentic Insights"
            description="CrewAI agents collaborate to identify match-winning moments and strategic errors."
            delay={0.2}
          />
          <FeatureCard 
            icon={<MessageSquare className="w-8 h-8 text-primary" />}
            title="Fan Chatbot"
            description="Ultra-fast conversational AI powered by Groq Llama 3 for instant match Q&A."
            delay={0.3}
          />
          <FeatureCard 
            icon={<Trophy className="w-8 h-8 text-secondary" />}
            title="Pro Dashboard"
            description="Bento-style layouts with interactive charts and automated commentary feeds."
            delay={0.4}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 text-center text-sm text-muted-foreground">
        <p>© 2026 CrickIntel AI. Built for the future of sports analytics.</p>
      </footer>
    </div>
  )
}

const FeatureCard = ({ icon, title, description, delay }) => (
  <GlassCard delay={delay} className="group cursor-default">
    <div className="mb-6 p-3 w-fit rounded-xl bg-white/5 group-hover:bg-primary/10 transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
  </GlassCard>
)

export default LandingPage
