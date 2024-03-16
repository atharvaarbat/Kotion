import React, { useEffect, useState } from 'react'
import { CardContent, Card } from "@/components/ui/card"
import { formatRelative } from "date-fns";
import Link from 'next/link'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { getAllPages } from '@/lib/docDetails'
import { MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';
import { updateTrashStatus } from '@/lib/setDocDetails';
const Cards = () => {
    const [allPages, setAllPages] = useState([])
    useEffect(() => {
        const init = async () => {
            setAllPages(await getAllPages())
            console.log(getAllPages())
        }
        init();
    }, [])

    return (
        <>
            {
                allPages.map((page, index) => {

                    const tt = formatRelative(new Date(parseInt(page.updated_at)), new Date())

                    const handelPageDelete = () => {
                        updateTrashStatus(page.id, true)
                        setAllPages(getAllPages())
                    }

                    if (page.trashed) {
                        return null;
                    }
                    return (
                        <Card key={index} className='overflow-hidden'>

                            <div style={{
                                backgroundImage: `url(${page.cover_image})`
                            }} className='h-40 bg-cover bg-center relative flex justify-end items-start p-2'>

                            </div>

                            <CardContent className="flex justify-between  p-4">
                                <Link className="inset-0 z-10" href={`/doc/${page.id}`}>
                                    <div>
                                        <div className="font-semibold">{page.title}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{tt}</div>
                                    </div>
                                </Link>
                                <div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger><Button variant='ghost' size='icon'><MoreVertical size={20} /></Button></DropdownMenuTrigger>
                                        <DropdownMenuContent>


                                            <DropdownMenuItem onClick={() => handelPageDelete()}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                            </CardContent>



                        </Card>
                    )
                })
            }

        </>

    )
}

export default Cards