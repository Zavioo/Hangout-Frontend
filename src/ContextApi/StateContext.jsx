import React, { createContext, useState } from 'react'
export const StateContext = createContext();
export const ActiveTabContext = createContext();
export const AllPosts = createContext();

export const ContextApi = ({ children }) => {

    const [sharedState, setSharedState] = useState('Initial State');
    const [activeTab, setActiveTab] = useState('all')


    return (

        <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
            <StateContext.Provider value={{ sharedState, setSharedState }}>
                {children}
            </StateContext.Provider>
        </ActiveTabContext.Provider>

    );
};

export default ContextApi