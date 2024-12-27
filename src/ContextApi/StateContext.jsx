import React, { createContext, useState } from 'react'
export const StateContext = createContext();
export const ActiveTabContext = createContext();
export const AddPostResponseContext = createContext();
export const EditPostResponseContext = createContext();

export const ContextApi = ({ children }) => {

    const [sharedState, setSharedState] = useState('Initial State');
    const [activeTab, setActiveTab] = useState('all')
    const [addPostResponse, setAddPostResponse] = useState('')
    const [editPostResponse, setEditPostResponse] = useState('')



    return (

        <EditPostResponseContext.Provider value={{ editPostResponse, setEditPostResponse }}>
            <AddPostResponseContext.Provider value={{ addPostResponse, setAddPostResponse }}>
                <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
                    <StateContext.Provider value={{ sharedState, setSharedState }}>
                        {children}
                    </StateContext.Provider>
                </ActiveTabContext.Provider>
            </AddPostResponseContext.Provider>
        </EditPostResponseContext.Provider>
    );
};

export default ContextApi