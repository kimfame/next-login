'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

export default function Header() {
  const { data, status } = useSession()

  if (status === 'authenticated') {
    return (
      <header>
        <nav>
          <Link href="/">Home</Link>
          <button type="button" onClick={() => signOut()}>
            Logout
          </button>
          <p>User : {data ? data.user.email : 'No data'}</p>
        </nav>
      </header>
    )
  }

  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <p>User : None</p>
      </nav>
    </header>
  )
}
