'use client'
import React, { useContext, useEffect, useState, useLayoutEffect } from 'react'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { restrictToParentElement, restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers'
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, closestCorners, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Text from '../_blocks/Text'
import { getPageData } from '@/lib/docDetails'
import { reorderPageContent } from '@/lib/setDocDetails'
import Block from './Block'
import { AppContext } from '@/context/AppContext'
import { stringify } from 'postcss'



const Column = ({ docId }) => {
  const { blocks, setBlocks, crntDocData, setCrntDocData } = useContext(AppContext)
 
  useEffect(() => {
    const init = async () => {
      setBlocks(await getPageData(docId).content)
     

    }
    init()
  }, [])
 


  const getBlockPos = id => blocks.findIndex(task => task.id === id)
  const handelDragEnd = (event) => {
    const { active, over } = event
    if (active.id === over.id) return;
    setBlocks(tasks => {
      const orignalPos = getBlockPos(active.id)
      const newPos = getBlockPos(over.id)
      reorderPageContent(docId, arrayMove(tasks, orignalPos, newPos))
      return arrayMove(tasks, orignalPos, newPos)
    })
      const orignalPos = getBlockPos(active.id)
      const newPos = getBlockPos(over.id)
      reorderPageContent(docId, arrayMove(crntDocData.content, orignalPos, newPos))
      
    setCrntDocData(prev=>({
      ...prev,
      content: arrayMove(crntDocData.content, orignalPos, newPos)
    }))

  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )



  return (

    <DndContext sensors={sensors}
      onDragEnd={handelDragEnd}
      collisionDetection={closestCenter}
      modifiers={[restrictToWindowEdges]}
    >
      <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
        {
          crntDocData.content.map((block) => (

            <Block key={`${block.id}-${crntDocData.updated_at}`} id={block.id} data={block} type={block.type} />



          ))
        }

      </SortableContext>


    </DndContext>
  )
}

export default Column

