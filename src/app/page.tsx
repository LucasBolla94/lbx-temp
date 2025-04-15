import Image from 'next/image'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Counter from '@/components/Counter'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="relative bg-[var(--black-500)] text-[var(--gray-200)] min-h-screen overflow-hidden">
      {/* Background com imagem e overlay */}
      <Image
        src="/BG.png"
        alt="Background"
        fill
        className="absolute z-0 object-cover opacity-80"
        priority
        sizes='100vw'
      />

      {/* Conteúdo sobre o fundo */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        {/* Centraliza tudo aqui */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-12 text-center space-y-12">
          <Hero />
          <Counter />
        </main>

        <Footer />
      </div>
    </div>
  )
}
