import { useState } from "react"
import { API_FETCH } from "../Services/api"

const useApi =(urlObject)=>{
    const [responce,setResponce]=useState(null);
    const [error ,setError]= useState("");
    const [isLoading,setLoading]=useState(false);
    const call = async(payload)=>{
        setResponce(null);
        setLoading(true);
        setError("");
        try {
            let res = await API_FETCH(urlObject,payload);
            setResponce(res.data);
        } catch (error) {
            setError(error.message);
        }
        finally{
            setLoading(false);
        }
    }
    return {call, responce, error, isLoading};
}

export default useApi;
