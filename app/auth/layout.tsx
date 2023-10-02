import Link from 'next/link'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

import logo from '/public/images/logo-icon.png'
import { Container } from '../components/Container'

export default function AuthLayout({ children }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-slate-100 py-16 sm:py-20">
      <Link
        href="/"
        className="group absolute right-8 top-8 hidden cursor-pointer items-center justify-center border border-gray-secondary-400/60 bg-gray-secondary-50 p-2 transition duration-150 ease-in-out hover:bg-vanilla focus:outline-none sm:flex lg:right-12 lg:top-12"
      >
        <XMarkIcon className="h-5 w-5 text-slate-800" />
      </Link>
      <Container className="w-full">
        <div className="mx-auto flex max-w-lg flex-col items-center">
          <Link href="/" className="flex flex-shrink-0" aria-label="Home">
            {/*<Image src={logo} className="h-auto w-12" alt="Logo" />*/}
            KYARIA.AI
          </Link>
          {children}
        </div>
      </Container>
    </section>
  )
}
