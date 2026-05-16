import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadMatch } from '../api'
import { Upload, FileJson, Loader2 } from 'lucide-react'

const UploadPage = () => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === 'application/json') {
      setFile(selectedFile)
      setError('')
    } else {
      setError('Please select a valid JSON file.')
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    try {
      const response = await uploadMatch(file)
      // Store summary in localStorage for simplicity in MVP
      localStorage.setItem('matchSummary', JSON.stringify(response.data.summary))
      navigate('/dashboard')
    } catch (err) {
      setError('Failed to upload match data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-8 rounded-2xl border border-border bg-card shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Upload Match Data</h2>
        
        <div 
          className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${
            file ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'
          }`}
        >
          <input 
            type="file" 
            accept=".json"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center gap-4">
            {file ? (
              <>
                <FileJson className="w-12 h-12 text-primary" />
                <span className="font-medium text-primary">{file.name}</span>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-muted-foreground" />
                <span className="text-muted-foreground">Click or drag JSON file here</span>
              </>
            )}
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-destructive text-center">{error}</p>}

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full mt-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            'Analyze Match'
          )}
        </button>
      </div>
    </div>
  )
}

export default UploadPage
