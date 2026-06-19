import React, { useEffect, useState } from 'react'
import Login from './pages/Login'
import Animals from './pages/Animals'
import { supabase } from './supabaseClient'

export default function App() {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    let mounted = true
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setSession(data.session)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, sess) => {
  setSession(sess)
})
    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  if (!session) return <Login />
  return <Animals />
}
