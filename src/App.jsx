import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export default function App() {
  const [jobs, setJobs] = useState([])

  const fetchJobs = async () => {
    const { data } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false })
    setJobs(data || [])
  }

  useEffect(() => { fetchJobs() }, [])

  return (
    <div style={{ padding: 16 }}>
      <h1>KYC Finder</h1>
      {jobs.map(job => (
        <div key={job.id} style={{ 
          marginBottom: 16, 
          padding: 12, 
          border: '1px solid #ddd',
          borderRadius: 8 
        }}>
          <h3>{job.title}</h3>
          <p>💰 {job.price} | {job.is_available ? '✅ Tersedia' : '❌ Penuh'}</p>
          <button onClick={() => window.open(job.contact_url)}>
            Apply via WhatsApp
          </button>
        </div>
      ))}
    </div>
  )
}