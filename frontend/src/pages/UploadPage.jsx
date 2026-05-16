import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { uploadMatch } from '../api'
import { Upload, FileJson, Loader2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button'
import GlassCard from '../components/ui/GlassCard'
import Badge from '../components/ui/Badge'

const UploadPage = () => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    console.log(`[FRONTEND] User selected file: ${selectedFile?.name} (${selectedFile?.size} bytes)`);
    if (selectedFile && selectedFile.type === 'application/json') {
      setFile(selectedFile)
      setError('')
      setSuccess(false)
    } else {
      console.warn("[FRONTEND] Invalid file type selected");
      setError('Invalid format. Please upload a cricket match JSON file.')
      setFile(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return
    console.log("[FRONTEND] Starting upload process...");
    setLoading(true)
    setError('')
    try {
      console.log("[FRONTEND] Sending match data to backend...");
      const response = await uploadMatch(file)
      console.log("[FRONTEND] Upload completed successfully. Response status:", response.status);
      
      if (response.data && response.data.summary) {
        console.log("[FRONTEND] Summary data received:", Object.keys(response.data.summary));
        localStorage.setItem('matchSummary', JSON.stringify(response.data.summary))
        setSuccess(true)
        console.log("[FRONTEND] Navigating to dashboard in 1.5s...");
        setTimeout(() => navigate('/dashboard'), 1500)
      } else {
        console.error("[FRONTEND] Response received but summary data is missing!");
        setError('Server returned incomplete data. Check backend logs.')
      }
    } catch (err) {
      console.error("[FRONTEND] Upload failed:", err);
      setError('Upload failed. Ensure the JSON follows the Cricsheet format.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 bg-sports-grid bg-[length:50px_50px]">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-xl"
      >
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-bold group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <GlassCard className="p-10 border-white/5 shadow-2xl">
          <div className="text-center mb-10">
            <Badge variant="ai" className="mb-4">Data Ingestion Engine</Badge>
            <h2 className="text-4xl font-black mb-3">UPLOAD MATCH DATA</h2>
            <p className="text-muted-foreground">Drop your ball-by-ball JSON file to start the AI analysis.</p>
          </div>
          
          <div 
            className={`relative border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-500 group ${
              file ? 'border-primary/50 bg-primary/5' : 'border-white/10 hover:border-primary/30 hover:bg-white/5'
            }`}
          >
            <input 
              type="file" 
              accept=".json"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            
            <div className="relative z-10 flex flex-col items-center gap-6">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div 
                    key="success"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shadow-neon-green">
                      <CheckCircle2 size={40} />
                    </div>
                    <span className="font-black text-secondary uppercase tracking-widest">Processing Complete</span>
                  </motion.div>
                ) : file ? (
                  <motion.div 
                    key="file"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-neon">
                      <FileJson size={40} />
                    </div>
                    <div className="text-center">
                      <span className="block font-bold text-lg text-primary">{file.name}</span>
                      <span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB • Ready for analysis</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="empty"
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all duration-500">
                      <Upload size={40} />
                    </div>
                    <div className="text-center">
                      <span className="block font-bold text-muted-foreground group-hover:text-foreground transition-colors">Click or drag JSON file</span>
                      <span className="text-xs text-muted-foreground/50">Cricsheet format supported (.json)</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3 text-destructive text-sm font-medium"
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            onClick={handleUpload}
            disabled={!file || loading || success}
            className="w-full mt-10 py-4 shadow-neon relative overflow-hidden group"
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin" />
                Initializing Agents...
              </div>
            ) : success ? (
              "Redirecting to Insights..."
            ) : (
              <>
                Start AI Analysis
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </>
            )}
          </Button>
        </GlassCard>
        
        <p className="mt-8 text-center text-xs text-muted-foreground uppercase tracking-[0.2em] font-bold opacity-50">
          Powered by Gemini 1.5 Flash & CrewAI
        </p>
      </motion.div>
    </div>
  )
}

export default UploadPage
