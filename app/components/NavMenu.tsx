"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButton from "./auth/AuthButton";

const ACTIVE_ROUTE = "inline-flex w-auto w-full px-3 py-2 rounded text-xl lg:text-lg text-gray-600 bg-gray-200 font-bold items-center justify-center hover:bg-gray-600 hover:text-white";
const INACTIVE_ROUTE = "inline-flex w-auto w-full px-3 py-2 rounded text-xl lg:text-lg text-gray-600 font-bold items-center justify-center hover:bg-gray-600 hover:text-white";

export default function NavMenu() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const handleLinkClick = () => {
    active? setActive(!active) : null
  };

  const pathname = usePathname();
  return (
    <>
      <nav className={`${active ? '' : 'shadow-md rounded-xl'}  p-3 flex items-center flex-wrap bg-white sticky top-0 z-50 overflow-visible`}>
        <button onClick={handleLinkClick}>
          <Link href='/'>
            <span className='inline-flex items-center p-2 mr-4 '>
              <span className='text-xl text-gray-600 font-bold uppercase tracking-wide'>
                CAREER AI
              </span>
            </span>
          </Link>
        </button>
        <button
          className=' inline-flex p-3 hover:bg-gray-600 rounded lg:hidden text-gray-600 ml-auto hover:text-gray-600 outline-none'
          onClick={handleClick}
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div
          className={`${active ? '' : 'hidden'}  w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full items-center items-start  flex flex-col lg:h-auto'>
            <button onClick={handleLinkClick}>
              <Link href='/jobs'>
              <span className= {pathname === '/jobs' ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                  JOBS
                </span>
              </Link>
            </button>
            <button onClick={handleLinkClick}>
              <Link href='/'>
              <span className= {pathname === '/about' ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                  ABOUT
                </span>
              </Link>
            </button>
            <button onClick={handleLinkClick}>
              <Link href='/'>
              <span className= {pathname === '/contact' ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                  CONTACT
                </span>
              </Link>
            </button>
            <AuthButton />
          </div>
        </div>
      </nav>
    </>
  );
}

