"use client"
import axios from "axios";
import { useEffect, useState } from "react";

function FetchData() {

    const [confession, setConfession] = useState([]);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    useEffect(()=>{
        async function fetchConfession() {
            try {
                const response = await axios.get("http://127.0.0.1:5000/confessions");
                setConfession(response.data);
            } catch (error) {
                console.log(error);
            }        
        }
        fetchConfession();

    },[]);


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name || !message) {
            alert("Both fields are required!");
            return;
        }

        try {
            const sendResponse = await axios.post("http://127.0.0.1:5000/confess",{name,message})
            alert(`${name} your confession is save with me!`)
            setName("")
            setMessage("")
            console.log(sendResponse.data);
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="contanier">
        <div>
            CONFESSIONS TILL NOW
            {confession.map((data)=>(
                    <li key={data.id}>
                        <strong> {data.name} </strong> : {data.message}
                    </li>
            ))}
        </div>
        <div>
            <form onSubmit={handleSubmit} >
            <input type="text" value={name} 
            placeholder="enter cool gibbrish some name" 
            onChange={(e)=>setName(e.target.value)}/>
            <br></br>
            <input  type="text"
            placeholder="give your confession"
            value={message}
            onChange={(e)=>setMessage(e.target.value)} />
            <br/>
            <button type="submit">Confess</button>

            </form>
        </div>
    </div>
    
  )
}

export default FetchData