import React, { createContext, useState } from 'react'

export const StateContext = createContext();

export const ContextApi = ({ children }) => {

    const [sharedState, setSharedState] = useState('Initial State');

    return (

        <StateContext.Provider value={{ sharedState, setSharedState }}>
            {children}
        </StateContext.Provider> 

    );
};

export default ContextApi;