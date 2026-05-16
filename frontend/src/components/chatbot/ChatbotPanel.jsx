import React, { useState, useRef, useEffect } from 'react'
import { chatWithAI } from '../../api'
import { Send, User, Bot, Loader2, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Badge from '../ui/Badge'

const ChatbotPanel = ({ matchSummary }) => {
  const [question, setQuestion] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  const handleSend = async () => {
    if (!question.trim() || loading) return

    const userMsg = { role: 'user', content: question }
    setChatHistory(prev => [...prev, userMsg])
    setQuestion('')
    setLoading(true)

    try {
      const response = await chatWithAI(question)
      const botMsg = { role: 'bot', content: response.data.response }
      setChatHistory(prev => [...prev, botMsg])
    } catch (err) {
      console.error(err)
      setChatHistory(prev => [...prev, { role: 'bot', content: 'Agent connection lost. Please check your API keys.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full min-h-[400px]">
      <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-2 custom-scrollbar">
        {chatHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
             <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                <Bot size={24} className="text-muted-foreground/30" />
             </div>
             <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">System Ready</p>
             <p className="text-[10px] text-muted-foreground/50 mt-2 max-w-[200px]">
               Ask about turning points, player impact, or strategic decisions.
             </p>
          </div>
        )}
        
        <AnimatePresence initial={false}>
          {chatHistory.map((msg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                msg.role === 'user' ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-secondary/20 border-secondary/30 text-secondary'
              }`}>
                {msg.role === 'user' ? <User size={14} /> : <Sparkles size={14} />}
              </div>
              <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-primary text-primary-foreground font-bold rounded-tr-none' 
                  : 'bg-white/5 border border-white/5 text-muted-foreground rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-secondary/20 border border-secondary/30 flex items-center justify-center shrink-0 text-secondary">
              <Bot size={14} />
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 rounded-tl-none flex items-center gap-3">
              <div className="flex gap-1">
                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-secondary" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Thinking</span>
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="relative group">
        <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
        <div className="relative flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-2 pl-4 focus-within:border-primary/50 transition-all">
          <input 
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about the match..."
            className="flex-1 bg-transparent border-none text-xs font-medium focus:outline-none placeholder:text-muted-foreground/30"
          />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!question.trim() || loading}
            className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center disabled:opacity-50 shadow-neon"
          >
            <Send size={16} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default ChatbotPanel
