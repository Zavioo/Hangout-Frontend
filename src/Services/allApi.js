import commonApi from "./commonApi"
import SERVER_URL from "./serverURL"

// registerAPI called by Authh
export const registerAPI = async (reqBody) => {
    return await commonApi("POST", `${SERVER_URL}/register`, reqBody)
}

//loginApi called by Authh
export const loginAPI = async (reqBody) => {
    return await commonApi("POST", `${SERVER_URL}/login`, reqBody)
}


// updateUserAPI called by profile component when user click update btn -  edit-user
export const updateUserAPI = async (reqBody, reqHeader) => {
    return await commonApi("PUT", `${SERVER_URL}/edit-user`, reqBody, reqHeader)
}

// api called by add post component
export const addPostAPI = async (reqBody, reqHeader) => {
    return await commonApi("POST", `${SERVER_URL}/add-post`, reqBody, reqHeader)
}

// api Called by Feeds Component 
export const allPostAPI = async (searchKey) => {
    return await commonApi("GET", `${SERVER_URL}/all-posts?search=${searchKey}`, {})
}

// to edit posts called by EditPost Component
export const updatePostAPI = async (id, reqBody, reqHeader) => {
    return await commonApi("PUT", `${SERVER_URL}/post/${id}/edit`, reqBody, reqHeader)
}

// userPostRemoveAPI called by removePost component when user click delete button
export const userPostRemoveAPI = async (id, reqHeader) => {
    return await commonApi("DELETE", `${SERVER_URL}/post/${id}/remove`, {}, reqHeader)
}
// called by lIkeButton component when user click like button
export const updatelikeAPI = async (id, reqBody, reqHeader) => {
    return await commonApi("PUT", `${SERVER_URL}/post/${id}/like`, reqBody, reqHeader)
}

// called by PostComments component when user click add button
export const addCommentAPI = async (id, reqBody, reqHeader) => {
    return await commonApi("PUT", `${SERVER_URL}/post/${id}/comments`, reqBody, reqHeader)
}

// called by PostComments component when user click delete button
export const removeCommentAPI = async (id, reqBody) => {
    return await commonApi("DELETE", `${SERVER_URL}/post/${id}/removecomments`, reqBody)
}

export const getUserPostsAPI = async (id) => {
    return await commonApi("GET", `${SERVER_URL}/getuserposts/${id}`, {})
}

export const updateFriendsAPI = async (id, reqBody, reqHeader) => {
    return await commonApi("PUT", `${SERVER_URL}/user/${id}/friends`, reqBody, reqHeader)
}

export const getFriendsAPI = async (id) => {
    return await commonApi("GET", `${SERVER_URL}/user/${id}`, {})
}

export const allUsersAPI = async (searchKey) => {
    return await commonApi("GET", `${SERVER_URL}/users/all?search=${searchKey}`, {})
}

export const updateSavedPostAPI = async (id, reqBody) => {
    return await commonApi("PUT", `${SERVER_URL}/user/${id}/savepost`, reqBody)
}

export const getSavedPostAPI = async (id) => {
    return await commonApi("GET", `${SERVER_URL}/user/${id}/getsavedpost`, {})
}

export const openChatAPI = async (id, reqBody) => {
    return await commonApi("POST", `${SERVER_URL}/user/${id}/openchat`, reqBody)
}

export const createMassageAPI = async (reqBody) => {
    return await commonApi("POST", `${SERVER_URL}/user/createmassage`, reqBody)
}

export const fetchMassagesAPI = async (id) => {
    return await commonApi("GET", `${SERVER_URL}/user/${id}/fetchallmassages`, {})
}