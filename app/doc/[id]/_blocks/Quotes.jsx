import { AppContext } from '@/context/AppContext'
import { addBlock, updateText } from '@/lib/setDocDetails'
import React, { useContext, useState } from 'react'

import './Block.css'
import { getPageData } from '@/lib/docDetails'


const Quote = ({ id, text }) => {


    const { crntDocId, setCrntDocId, crntDocData, setCrntDocData } = useContext(AppContext)
    const [textData, setTextData] = useState(text)
    const handleInput = (event) => {
        // const typedChar = event.target.textContent.slice(-1)

        // if (typedChar === '/') {

        //     console.log("Function triggered on typing '/'")

        // }
        updateText(crntDocId, id, event.target.textContent)

    }

    const handleKeyDown = async (event) => {

        if (event.keyCode === 13) {

            addBlock(crntDocId, id)
            const updatedData = await getPageData(crntDocId);

            setCrntDocData(updatedData);
        }
    };
    return (
        <>

            <p name={id} id={id} contentEditable={true} className={`${id} text text-lg p-2 outline-none w-full flex border-l-2 border-primary italic`} onInput={handleInput} onKeyDown={handleKeyDown}>
                {textData}
            </p>


        </>
    )
}

export default Quote

