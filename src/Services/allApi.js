import commonApi from "./commonApi"
import SERVER_URL from "./serverURL"

// registerAPI called by Authh
export const registerAPI = async (reqBody) => {
    return await commonApi("POST", `${SERVER_URL}/register`, reqBody)
}



