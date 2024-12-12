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


