
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [crntDocId, setCrntDocId] = useState()
    const [crntDocData, setCrntDocData] = useState({content: []})
    const [blocks, setBlocks] = useState([])
    return (
        <AppContext.Provider value={{crntDocId, setCrntDocId, crntDocData, setCrntDocData, blocks, setBlocks}}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
