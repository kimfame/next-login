'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <header>
      <nav className="flex items-center gap-8 py-8">
        <Link href="/">Home</Link>
        {session ? (
          <>
            <button type="button" onClick={() => signOut()}>
              Logout
            </button>
            <Link href="/">Hello, {session?.user?.name}</Link>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>

      <p>{loading && 'Loading...'}</p>
    </header>
  )
}
