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
export const allPostAPI = async () => {
    return await commonApi("GET", `${SERVER_URL}/all-posts`, {})
}

// to edit posts called by EditPost Component
export const updatePostAPI = async (id, reqBody, reqHeader) => {
    return await commonApi("PUT", `${SERVER_URL}/post/${id}/edit`, reqBody, reqHeader)
}

// userPostRemoveAPI called by removePost component when user click delete button
export const userPostRemoveAPI =async(id,reqHeader)=>{
    return await commonApi("DELETE",`${SERVER_URL}/post/${id}/remove`,{},reqHeader)
}

export const updatelikeAPI = async (id, reqBody, reqHeader) => {
    return await commonApi("PUT", `${SERVER_URL}/post/${id}/like`, reqBody, reqHeader)
}
