import axios from "axios";
import { URL } from "./services";

const API_FETCH=async(urlObject,payload)=>{
    return await axios({
        method:urlObject.method,
        url:`${URL}/${urlObject.endpoint}`,
        data:payload,
        headers:{
            "Content-Type":"application/json",
            "authtoken":localStorage.getItem("authtoken")||""
        }
    })
}

export {API_FETCH}