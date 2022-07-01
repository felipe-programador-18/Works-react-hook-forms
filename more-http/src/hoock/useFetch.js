import  {useState, useEffect} from 'react'


export const useFetching = (url) => {
    const[data, setDate] = useState(null)
    const[method, setMethod] = useState(null)
    const[setting, setSetting] = useState(null)
    const[loading, setLoading] = useState(false)
    const[error, setError] = useState(false)
    const [callfet, setCallfet] = useState(false)
    const [itemId, setItem] = useState(null) 


    const HttpConf = (data, method) => {
      if(method === "POST"){
        setSetting({
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        setMethod("POST")

      }else if (method === "DELETE"){
        setSetting({
            method:"DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
        setMethod('DELETE')
        setItem(data)
      }
    }


   useEffect(() => {
    //remind here i get date about api
    const FetchingDate = async () =>{
     setLoading(true)
     
     try{
        const res = await fetch(url)
        const json = await res.json()
        setDate(json)
        setMethod(null)
        setError(null)
     } catch (error) {
        console.log(error.message)
        setError("error os request api s")
     }

     setLoading(false)   
     }
     FetchingDate()
   }, [ url, callfet])

    
   useEffect(() => {
     
    const HttpResquest = async () => {
        if(method === "POST"){
            setLoading(true)
            let fetchinOption = [url, setting]
            const res = await fetch(...fetchinOption)
            const json= await res.json();
            setCallfet(json)
        } else if(method === "DELETE"){
            const deleteUrl = `${url}/${itemId}`
            const res = await fetch(deleteUrl, setting)
            const json = await res.json()
            setCallfet(json)
        };
    };
    HttpResquest()
   },[setting])
   console.log(setting)   
  return { data, HttpConf , loading, error}
}
