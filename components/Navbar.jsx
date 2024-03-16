
import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"

import { ModeToggle } from './theme/mode-toggle'

const Navbar = () => {
  return (
    <header className="flex justify-between  w-full h-16 px-4  shrink-0 bg-transparent md:px-6">
        <div className="flex">
          <Link
            className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4"
            href="#">
            <FrameIcon className="w-6 h-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <nav
            className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
            <Link className="font-bold" href="/">
              Kotion
            </Link>
            <Link className="text-gray-500 dark:text-gray-400" href="/trash">
             Trash
            </Link>
            
          </nav>
        </div>

        <div className="flex items-center  gap-4  md:gap-2 lg:gap-4">
          <ModeToggle />
          <Button className="rounded-full" size="icon" variant="ghost">
            <img
              alt="Avatar"
              className="rounded-full border"
              height="32"
              src="/placeholder.svg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </header>
  )
}

export default Navbar

function FrameIcon(props) {
    return (
      (<svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <line x1="22" x2="2" y1="6" y2="6" />
        <line x1="22" x2="2" y1="18" y2="18" />
        <line x1="6" x2="6" y1="2" y2="22" />
        <line x1="18" x2="18" y1="2" y2="22" />
      </svg>)
    );
  }