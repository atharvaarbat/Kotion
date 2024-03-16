'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"

import { ModeToggle } from "../theme/mode-toggle";

import Cards from "./Cards";
import { createNewPage } from "@/lib/docDetails";
import { useRouter } from "next/navigation";
import Navbar from "../Navbar";
export function Dashboard() {
  
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



