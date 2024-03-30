'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleFormSubmit(ev) {
    ev.preventDefault()
    await signIn('credentials', { email, password, callbackUrl: '/' })
  }
  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
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
