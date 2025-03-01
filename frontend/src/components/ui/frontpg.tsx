import axios from "axios";
import { useState } from "react"
import Wall from "./wall";




function Frontpg() {

  const [name,setName] = useState<string>("");
  const [message,setMessage] = useState<string>("");

  const handleSubmit =  async(e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!message && !name){
      alert("really no name no confession, get a life bro")
    }
    if(!message){
      alert("oops! cann't see the wall without some sauccy confession")
    }
    if(!name){
      alert("oops! cann't see the wall without some hard to prounce name")
    }

    try {
      const SendUserData = await axios.post("http://127.0.0.1:5000/confess", {name,message})
      alert(`${name}, your confession is saved with me!`);
      setName("");
      setMessage("");
      console.log(SendUserData);
      
    } catch (error) {
      console.log("ERROR!" ,error);
    }

  };

  
  return (
    <div className= 'min-h-screen bg-indigo-300 opacity-70 '>
        <span className="grid justify-center p-3 text-5xl pt-4"> THE WALL 🧱 OF CONFESSION </span>

          <form id = '.fade-text' className = "grid justify-center mt-52 mb-24 " onSubmit={handleSubmit}>
            <input className = "border-4 border-solid rounded-2xl p-4 text-2xl text-center font-bold"
              type="text" value={name} placeholder="give some fancy name" 
              onChange={(e)=>setName(e.target.value)} 
            />
            <br/>            
            <input className = "border-4 border-solid rounded-2xl p-4 text-2xl text-center font-bold"
              type="text" value={message} placeholder="time for some dark confession" 
              onChange={(e)=>setMessage(e.target.value)} 
            />
            <br />            
            <button className = "border-4 hover:bg-blue-600 hover:text-3xl border-solid rounded-2xl p-4 text-2xl text-center font-bold"
             type="submit">Confess</button>
          </form>

          <Wall/>
          </div>
  )
}

export default Frontpg

