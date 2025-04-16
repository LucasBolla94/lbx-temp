'use client'

import { useState } from 'react'
import { auth } from '@/lib/firebase/client'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import RegisterForm from '@/components/dash/RegisterForm'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const token = await result.user.getIdToken()

      Cookies.set('token', token, { expires: 7 }) // 7-day cookie

      setSuccess(true)

      setTimeout(() => {
        router.push('/dash')
      }, 2000)
    } catch (error) {
      alert('Login failed. Please check your email and password.')
      console.error(error)
    }
  }

  if (showRegister) {
    return <RegisterForm />
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-zinc-800 border border-zinc-700 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-5 text-white">
        <h2 className="text-2xl font-bold text-center text-green-500 mb-2">Welcome Back</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="p-3 rounded bg-zinc-700 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="p-3 rounded bg-zinc-700 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={handleLogin}
          className="w-full mt-2 bg-green-600 hover:bg-green-700 transition-all py-3 rounded-lg font-semibold"
        >
          Login
        </button>

        {success && (
          <div className="mt-4 text-green-400 text-center text-lg font-medium">
            ✅ Login successful! Redirecting...
          </div>
        )}

        {/* Botão para trocar para registro */}
        <button
          onClick={() => setShowRegister(true)}
          className="w-full mt-4 text-green-400 underline text-sm hover:text-green-300"
        >
          Don&apos;t have an account? Register
        </button>
      </div>
    </div>
  )
}
