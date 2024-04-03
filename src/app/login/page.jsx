'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  })

  function handleChange(e) {
    const { name, value } = e.target

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  async function handleSubmit(ev) {
    ev.preventDefault()

    if (formData?.email && formData?.password) {
      await signIn('credentials', {
        ...formData,
        callbackUrl: '/',
      })
    }
  }
  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={formData.email || ''}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formData.password || ''}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          Google Login
        </button>
      </form>
    </section>
  )
}
