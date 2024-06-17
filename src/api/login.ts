import axiosInstance from "./axiosInstance";

interface ResponseData{
    valid: boolean
}

async function login(data: object): Promise<boolean>{
    const response = await axiosInstance.post("/login", data)
    const resData = <ResponseData>response.data

    return resData.valid
}

export default login