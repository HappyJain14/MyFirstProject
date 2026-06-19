import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

type Animal = { id: number; name: string; species?: string; status?: string; description?: string }

export default function Animals() {
  const [animals, setAnimals] = useState<Animal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      const { data, error } = await supabase.from('animals').select('*')
      if (error) {
        console.error(error)
      } else if (mounted) {
        setAnimals(data || [])
      }
      setLoading(false)
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  return (
    <div>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h1>Animals & Endangered Species</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      {loading ? <p>Loading...</p> : (
        animals.length ? animals.map(a => (
          <div key={a.id} className="card">
            <h3>{a.name} — {a.species}</h3>
            <p><strong>Status:</strong> {a.status}</p>
            <p>{a.description}</p>
          </div>
        )) : <p>No animals found. Add rows to the `animals` table in Supabase.</p>
      )}
    </div>
  )
}
