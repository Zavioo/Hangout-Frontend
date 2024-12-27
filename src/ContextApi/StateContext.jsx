import React, { createContext, useState } from 'react'
export const StateContext = createContext();
export const ActiveTabContext = createContext();
export const PostResponseContext = createContext();

export const ContextApi = ({ children }) => {

    const [sharedState, setSharedState] = useState('Initial State');
    const [activeTab, setActiveTab] = useState('all')
    const [postResponse, setPostResponse] = useState('')



    return (
        <PostResponseContext.Provider value={{ postResponse, setPostResponse }}>
            <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
                <StateContext.Provider value={{ sharedState, setSharedState }}>
                    {children}
                </StateContext.Provider>
            </ActiveTabContext.Provider>
        </PostResponseContext.Provider>
    );
};

export default ContextApi