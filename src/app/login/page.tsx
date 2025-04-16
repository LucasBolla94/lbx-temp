'use client'

import Image from 'next/image'
// import { useState } from 'react' // pode remover se não for alternar
import LoginForm from '@/components/dash/LoginForm'
// import RegisterForm from '@/components/dash/RegisterForm' // descomente se for usar registro

export default function LoginPage() {
  return (
    <div className="relative text-white min-h-screen overflow-hidden">
      {/* Background image */}
      <Image
        src="/BG.png"
        alt="Background"
        fill
        className="absolute z-0 object-cover opacity-80"
        priority
        sizes="100vw"
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center space-y-6">
        <h1 className="text-3xl font-bold">Login</h1>

        {/* Use one of the forms below */}
        <LoginForm />
        {/* <RegisterForm /> */}
      </div>
    </div>
  )
}
