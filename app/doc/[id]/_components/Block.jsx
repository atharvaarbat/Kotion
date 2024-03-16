import React, { useContext, useEffect, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { AlignLeft, Copy, GripVertical, MoreHorizontal, Plus, QuoteIcon, Repeat2, Trash2 } from 'lucide-react'
import Text from '../_blocks/Text'
import { H1, H2 } from '../_blocks/Headings'
import { Button } from '@/components/ui/button'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TextIcon } from '@radix-ui/react-icons'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from '@/components/ui/scroll-area'
import { AppContext } from '@/context/AppContext'
import { addBlock, deleteBlock, duplicateBlock, updateType } from '@/lib/setDocDetails'
import { getPageBlocks, getPageData } from '@/lib/docDetails'
import Quote from '../_blocks/Quotes'


const Block = ({ id, data, type }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id, lockAsis: 'y' })
    const { crntDocId, setCrntDocId, crntDocData, setCrntDocData, blocks, setBlocks } = useContext(AppContext)

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }
    const [isHover, setIsHover] = useState(false)
    const [blockContent, setBlockContent] = useState()
    useEffect(() => {

        if (type == 'text') {
            setBlockContent(<Text id={id} text={data.text} />)
        } else if (type == 'h1') {
            setBlockContent(<H1 id={id} text={data.text} />)
        } else if (type == 'h2') {
            setBlockContent(<H2 id={id} text={data.text} />)
        } else if (type == 'quote') {
            setBlockContent(<Quote id={id} text={data.text} />)
        }
    }, [])
    const handelContextClick = async (e) => {
        console.log(e, crntDocId, id)
        updateType(crntDocId, id, e)
        const updatedData = await getPageData(crntDocId);

        setCrntDocData(updatedData);


    }

    const handelAddBlock = async () => {
        const nextElementClass = addBlock(crntDocId, id);
        const nextElement = document.getElementsByClassName(nextElementClass)[0];

        console.log(nextElement);

        const updatedData = await getPageData(crntDocId);

        setCrntDocData(updatedData);
    }
    const handelDuplicate = async () => {

        duplicateBlock(crntDocId, id);
        const updatedData = await getPageData(crntDocId);

        setCrntDocData(updatedData);
    }
    const handelDelete = async () => {

        deleteBlock(crntDocId, id);
        const updatedData = await getPageData(crntDocId);

        setCrntDocData(updatedData);
    }
    return (
        <div ref={setNodeRef}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={style}
            className='flex w-full touch-none items-center' >
            <div className={(isHover ? 'opacity-100 transition-all duration-300 ease-in-out flex' : 'opacity-0 transition-all duration-300 ease-in-out flex')}
            >
                <div className='flex gap-1'>
                    <div className='cursor-pointer hover:bg-secondary rounded-md' onClick={() => handelAddBlock()}>
                        <Plus className='dark:text-[#3b3b3b] text-[#c3c3c3]' />


                    </div>

                    <Select onValueChange={(e) => handelContextClick(e)} className='outline-none'>
                        <SelectTrigger className="border-0 w-6 h-6 p-0 outline-none" >
                            <div className='cursor-pointer  hover:bg-secondary rounded-md'>
                                <Repeat2 className='dark:text-[#3b3b3b] text-[#c3c3c3]' />

                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <div className='flex gap-2 p-1'>
                                <Button onClick={() => handelDuplicate()} variant='secondary' className='w-full flex gap-2' ><Copy size={15} className='' /> Duplicate </Button>
                                <Button onClick={() => handelDelete()} variant='secondary' className='w-full flex gap-2 text-red-400' ><Trash2 size={15} className='' />Delete</Button>
                            </div>
                            <div className='p-2 text-md font-meduium'>Turn Into</div>
                            <ScrollArea className='max-h-80'>


                                <SelectItem value="text" className='p-0'>
                                    <div className='flex gap-2 items-center hover:bg-secondary p-2 rounded'>
                                        <div className='flex w-[56px] px-4 h-[56px] items-center justify-center bg-foreground rounded-sm ' >
                                            <TextIcon width={30} height={30} className='text-background' />
                                        </div>
                                        <div>
                                            <p className=''>
                                                Text
                                            </p>
                                            <p className='text-[12px] text-[#555]'>
                                                Just start writing with a plane text
                                            </p>

                                        </div>
                                    </div>

                                </SelectItem>
                                <SelectItem value="h1" className='p-0'>
                                    <div className='flex gap-2 items-center hover:bg-secondary p-2 rounded'>
                                        <div className='flex w-[56px] px-4 h-[56px] items-center justify-center bg-foreground rounded-sm ' >
                                            <p className='text-background text-2xl font-bold'>
                                                H1
                                            </p>
                                        </div>
                                        <div>
                                            <p className=''>
                                                Heading 1
                                            </p>
                                            <p className='text-[12px] text-[#555]'>
                                                Big section heding
                                            </p>

                                        </div>
                                    </div>

                                </SelectItem>
                                <SelectItem value="h2" className='p-0'>
                                    <div className='flex gap-2 items-center hover:bg-secondary p-2 rounded'>
                                        <div className='flex w-[56px] px-4 h-[56px] items-center justify-center bg-foreground rounded-sm ' >
                                            <p className='text-background text-lg font-bold'>
                                                H2
                                            </p>
                                        </div>
                                        <div>
                                            <p className=''>
                                                Heading 2
                                            </p>
                                            <p className='text-[12px] text-[#555]'>
                                                Medium section heading
                                            </p>

                                        </div>
                                    </div>

                                </SelectItem>
                                <SelectItem value="quote" className='p-0'>
                                    <div className='flex gap-2 items-center hover:bg-secondary p-2 rounded'>
                                        <div className='flex w-[56px] px-4 h-[56px] items-center justify-center bg-foreground rounded-sm ' >
                                            <p className='text-background text-xl font-bold'>
                                                "Q"
                                            </p>
                                        </div>
                                        <div>
                                            <p className=''>
                                                Quote
                                            </p>
                                            <p className='text-[12px] text-[#555]'>
                                                Capture a quote
                                            </p>

                                        </div>
                                    </div>

                                </SelectItem>
                            </ScrollArea>
                        </SelectContent>
                    </Select>
                    <div
                        {...attributes}
                        {...listeners}

                        contentEditable='false'
                    >
                        <GripVertical className='dark:text-[#3b3b3b] text-[#c3c3c3]  cursor-grab' />


                    </div>
                </div>

            </div>



            {blockContent}
        </div>
    )
}

export default Block