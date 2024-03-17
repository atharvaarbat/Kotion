'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Header } from './_components/Header'
import { Title } from './_components/Title'
import Column from './_components/Column'
import { AppContext } from '@/context/AppContext'
import { createNewPage, getPageData } from '@/lib/docDetails'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import NotFound from '../../../public/NoBlock.png'
import { addNewBlock } from '@/lib/setDocDetails'




const Page = ({ params }) => {
    const { crntDocId, setCrntDocId, crntDocData, setCrntDocData } = useContext(AppContext)


    useEffect(() => {
        setCrntDocId(params.id)
        const pageInit = async () => {

            setCrntDocData(await getPageData(params.id))
        }
        pageInit();

    }, [params.id, setCrntDocData, setCrntDocId])
    const handelAddNewBlock = async ()=>{

        addNewBlock(crntDocId);
        const updatedData = await getPageData(crntDocId);
        
        setCrntDocData(updatedData);
    }
    return (
        <>
          
            <div className='h-screen overflow-y-auto overflow-x-hidden'>
                
                <Header docId={params.id} />

                <div className='px-10 sm:px-20 md:px-40 lg:px-80'>
                    <Title docId={params.id} />

                    <div className='-ml-[87px] mt-4'>

                        <Column docId={params.id} />
                    </div>
                    {
                        crntDocData.content.length ? null :
                            <>
                                <div className='my-20 flex flex-col items-center gap-1'>
                                    <p className='text-xl text-center font-bold'>The page looks empty</p>
                                    <p className='text-md text-center text-[#555]'>try adding a block</p>
                                    <Button onClick={()=>handelAddNewBlock()}>Add Block</Button>
                                    <div className='w-full flex items-center justify-center dark:opacity-90'>
                                        <Image src={NotFound} width={400} alt='No Block Found' />
                                    </div>
                                </div>

                            </>
                    }
                </div>

            </div>

        </>
    )
}

export default Page
