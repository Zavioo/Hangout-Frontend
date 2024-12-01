import React, { createContext, useState } from 'react'

export const StateContext = createContext();

export const StateProvider = ({ children }) => {

    const [sharedState, setSharedState] = useState('Initial State');

    return (

        <StateContext.Provider value={{ sharedState, setSharedState }}>
            {children}
        </StateContext.Provider>

    );
};