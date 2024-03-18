'use client';
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setError(false);

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {'Content-Type': 'application/json'},
    });

    if (response.ok) {
      router.push('/login');
    }
    else {
      setError(true);
    }
  }
  return (
    <section>
      <h1>Register</h1>
      {error && (<div>ERROR</div>)}
      <form onSubmit={handleFormSubmit}>
        <input type="email" placeholder="email"
          value={email} onChange={ev => setEmail(ev.target.value)} />
        <input type="password" placeholder="password"
          value={password} onChange={ev => setPassword(ev.target.value)}/>
        <button type="submit">Register</button>
      </form>
    </section>
  );
}