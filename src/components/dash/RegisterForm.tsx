'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/lib/firebase/client'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

type RegisterFormProps = {
  onBack?: () => void
}

export default function RegisterForm({ onBack }: RegisterFormProps) {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
    referCode: '',
    isAdult: false,
    acceptTerms: false,
  })

  const [errors, setErrors] = useState<string[]>([])
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
    setErrors(prev => prev.filter(err => err !== name)) // limpa erro ao editar
  }

  const handleRegister = async () => {
    const { name, lastName, email, password, rePassword, referCode, isAdult, acceptTerms } = form
    const newErrors: string[] = []

    if (!isAdult) newErrors.push('isAdult')
    if (!acceptTerms) newErrors.push('acceptTerms')
    if (!name) newErrors.push('name')
    if (!lastName) newErrors.push('lastName')
    if (!email) newErrors.push('email')
    if (!password) newErrors.push('password')
    if (password !== rePassword) newErrors.push('rePassword')

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password)

      const userRef = doc(db, 'users', userCred.user.uid)
      await setDoc(userRef, {
        uid: userCred.user.uid,
        name,
        lastName,
        email,
        referCode,
        createdAt: new Date(),
      })

      setSuccess(true)
      setTimeout(() => {
        router.push('/dash')
      }, 2000)
    } catch (error: any) {
      console.error(error)
      alert('Error creating account: ' + error.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-zinc-800 border border-zinc-700 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-5 text-white">
        <h2 className="text-2xl font-bold text-center text-green-500 mb-2">Create Your LBX Account</h2>

        {success ? (
          <div className="text-center text-green-400 text-xl animate-pulse">
            ✅ Registration completed! 🎉
          </div>
        ) : (
          <>
            <input
              name="name"
              placeholder="First Name"
              onChange={handleChange}
              className={`p-3 rounded w-full bg-zinc-700 focus:outline-none focus:ring-2 ${errors.includes('name') ? 'border border-red-500' : 'focus:ring-green-500'}`}
            />
            <input
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              className={`p-3 rounded w-full bg-zinc-700 focus:outline-none focus:ring-2 ${errors.includes('lastName') ? 'border border-red-500' : 'focus:ring-green-500'}`}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className={`p-3 rounded w-full bg-zinc-700 focus:outline-none focus:ring-2 ${errors.includes('email') ? 'border border-red-500' : 'focus:ring-green-500'}`}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className={`p-3 rounded w-full bg-zinc-700 focus:outline-none focus:ring-2 ${errors.includes('password') ? 'border border-red-500' : 'focus:ring-green-500'}`}
            />
            <input
              name="rePassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              className={`p-3 rounded w-full bg-zinc-700 focus:outline-none focus:ring-2 ${errors.includes('rePassword') ? 'border border-red-500' : 'focus:ring-green-500'}`}
            />
            <input
              name="referCode"
              placeholder="Referral Code (optional)"
              onChange={handleChange}
              className="p-3 rounded w-full bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="isAdult"
                onChange={handleChange}
                className={`mt-1 w-5 h-5 text-green-600 ${errors.includes('isAdult') ? 'ring-2 ring-red-500' : 'focus:ring-green-500'}`}
              />
              <label className="text-sm">I confirm that I am over 18 years old</label>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="acceptTerms"
                onChange={handleChange}
                className={`mt-1 w-5 h-5 text-green-600 ${errors.includes('acceptTerms') ? 'ring-2 ring-red-500' : 'focus:ring-green-500'}`}
              />
              <label className="text-sm">
                I accept the <a href="#" className="text-green-400 underline">Terms of Service</a>
              </label>
            </div>

            <button
              onClick={handleRegister}
              className="w-full mt-2 bg-green-600 hover:bg-green-700 transition-all py-3 rounded-lg font-semibold"
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  )
}
