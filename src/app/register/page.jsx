'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [formData, setFormData] = useState({})
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMsg('')
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      router.refresh()
      router.push('/login')
    } else {
      const { message } = await res.json()
      setErrorMsg(message)
    }
  }
  return (
    <section>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="name"
          value={formData.name || ''}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="email"
          value={formData.email || ''}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={formData.password || ''}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p className="text-red-500">{errorMsg}</p>
    </section>
  )
}
