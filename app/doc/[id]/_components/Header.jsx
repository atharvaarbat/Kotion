
import React, { useContext, useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { changeCover } from '@/lib/setDocDetails'
import { AppContext } from '@/context/AppContext'
import { getPageData } from '@/lib/docDetails'
import { ModeToggle } from '@/components/theme/mode-toggle'

export const Header = ({ docId }) => {
    const { crntDocId, setCrntDocId, crntDocData, setCrntDocData } = useContext(AppContext)

    const [coverLink, setCoverLink ] = useState('')
    const handelImageAdd = async ()=>{
        changeCover(docId, coverLink)
        const updatedData = await getPageData(crntDocId);
        setCrntDocData(updatedData);
    }
  
    return (
        <div className='bg-gray-100 h-[30%]'>
            <div style={{
                backgroundImage: `url(${crntDocData.cover_image})`
            }} className='h-full bg-cover bg-center relative flex justify-end items-start p-2'>
                <Popover>
                    <PopoverTrigger>
                        <div className=' bg-background opacity-40 px-2 py-1 cursor-pointer hover:opacity-70 rounded text-sm'>Change cover</div>
                    </PopoverTrigger>
                    <PopoverContent className=''>
                        <Tabs defaultValue="account" className="w-full">
                            <TabsList className='w-full'>
                                <TabsTrigger value="account" className='w-full'>Gallery</TabsTrigger>
                                <TabsTrigger value="password" className='w-full'>Link</TabsTrigger>
                            </TabsList>
                            <TabsContent value="account">Make changes to your account here.</TabsContent>
                            <TabsContent value="password">

                            <div className="grid gap-4">
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Paste a link of an image (jpeg/jpg/png).
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="width">Image URL</Label>
                                    <Input
                                        id="width"
                                        defaultValue={crntDocData.cover_image}
                                        className="col-span-2 h-8"
                                        onChange={(e)=>setCoverLink(e.target.value)}
                                    />
                                    {/* <p className='text-sm  text-red-400'>An image url is must</p> */}
                                    <div className='flex gap-2 justify-end'>
                                    <Button variant='ghost'>Remove</Button>
                                    <Button variant='secondary' onClick={()=>handelImageAdd()}>Add</Button>
                                    </div>
                                    
                                </div>

                            </div>
                        </div>

                            </TabsContent>
                        </Tabs>
                        
                    </PopoverContent>
                </Popover>
                <ModeToggle/>
            </div>


        </div>
    )
}
