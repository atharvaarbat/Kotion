'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"

import { ModeToggle } from "../../components/theme/mode-toggle";
import { useTheme } from "next-themes";
import Cards from "../../components/component/Cards";
import { createNewPage } from "@/lib/docDetails";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
function Trash() {
  const {theme} = useTheme()
  const { push } = useRouter();
  const handelNewDoc = async ()=>{
    const newPageId = await createNewPage();
    push('/doc/'+newPageId)
  }
  return (
    (<div
      className="flex flex-col  w-full min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url(/bg-light.png)",
      }}>
      <Navbar/>
      <main
        className="flex min-h-[calc(100vh-_theme(spacing.16))]  flex-1 flex-col gap-4 sm:p-4 p-8 md:gap-8 md:p-10 ">
        <div className="max-w-6xl w-full mx-auto flex items-center gap-4">
          <div className="flex-1">
            <h1
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Discover Your Next Big Idea
            </h1>
            <p
              className=" max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Explore innovative projects to inspire your next big idea.
            </p>
          </div>
          <Button onClick={()=>handelNewDoc()}>Add New</Button>
        </div>
        <div
          className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 max-w-6xl w-full">
          
          <Cards/>
        </div>
      </main>
    </div>)
  );
}

export default Trash;
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
