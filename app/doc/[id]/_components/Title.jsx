'use client'
import { Button } from '@/components/ui/button'
import { AppContext } from '@/context/AppContext'
import { createNewPage, getPageData } from '@/lib/docDetails'
import { renamePageIcon, renamePageTitle } from '@/lib/setDocDetails'
import { DashIcon, DashboardIcon, IconJarLogoIcon } from '@radix-ui/react-icons'
import { Cross, LayoutDashboardIcon, X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useTheme } from 'next-themes'

export const Title = ({ docId }) => {
  const { theme } = useTheme()
  const { crntDocId, setCrntDocId, crntDocData, setCrntDocData } = useContext(AppContext)
  const [pageTitle, setPageTitle] = useState('')
  const [pageIcon, setPageIcon] = useState('')

  const [showEmoji, setShowEmoji] = useState(false)
  useEffect(() => {
    const init = async () => {
      setPageTitle(await getPageData(docId).title)
      setPageIcon(await getPageData(docId).icon)
    }
    init()

  }, [])

  const handelTitleChange = (e) => {

    renamePageTitle(docId, e.target.textContent)
  }

  const handelEmojiSelect = async (e) => {
    console.log(e.emoji)
    renamePageIcon(docId, e.emoji)
    const updatedData = await getPageData(crntDocId);
    setCrntDocData(updatedData);
  }
  return (
    <div className=' flex flex-col flex-1'>
      <div className=' w-fit -translate-y-[39px]'>
        {/* <LayoutDashboardIcon fill='black' width={78} height={78}/> */}

        <p onClick={() => setShowEmoji(!showEmoji)} className='text-[78px] -m-6 cursor-pointer select-none w-fit relative '>
          {
            showEmoji ? <div className='bg-background w-fit rounded-full p-1 absolute right-0 opacity-50 hover:opacity-100'><X size={15} /></div> : null
          }
          
          {crntDocData.icon}</p>

        <div className='relative'>
          <EmojiPicker open={showEmoji} suggestedEmojisMode='recent' theme={theme} className='absolute top-4' onEmojiClick={handelEmojiSelect} />
        </div>



      </div>
      <div>
        <h2 className='text-4xl font-extrabold  outline-none' onInput={handelTitleChange} contentEditable={true}>{pageTitle}</h2>
      </div>
      {/* <Button onClick={()=>createNewPage(docId)}>Cli</Button> */}
    </div>
  )
}
