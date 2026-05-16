import React, { useState } from 'react'
import { chatWithAI } from '../../api'
import { Send, User, Bot, Loader2 } from 'lucide-react'

const ChatbotPanel = ({ matchSummary }) => {
  const [question, setQuestion] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [loading, setLoading] = useState(false)

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
      setChatHistory(prev => [...prev, { role: 'bot', content: 'Sorry, I had trouble processing that.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
        {chatHistory.length === 0 && (
          <p className="text-sm text-muted-foreground text-center mt-10">
            Ask anything! "Why did they lose?", "Who was the most impactful bowler?"
          </p>
        )}
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-accent'
            }`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`p-3 rounded-2xl text-sm ${
              msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-accent rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
              <Bot size={16} />
            </div>
            <div className="p-3 rounded-2xl bg-accent rounded-tl-none flex items-center gap-2">
              <Loader2 size={14} className="animate-spin" />
              <span className="text-xs">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <input 
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your question..."
          className="w-full bg-accent border border-border rounded-xl py-3 px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button 
          onClick={handleSend}
          disabled={!question.trim() || loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-primary/10 rounded-lg disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  )
}

export default ChatbotPanel
