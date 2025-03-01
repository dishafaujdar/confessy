"use client";
import axios from "axios";
import { useEffect, useState } from "react";

type ConfessionItem = {
  id: number;
  name: string;
  message: string;
};

function FetchData() {
  const [confessions, setConfessions] = useState<ConfessionItem[]>([]);
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [page, setPage] = useState(1);
  const [hasmore, setHasmore] = useState(true);
  const [loading, setLoading] = useState(false);


  const fetchConfessions = async () => {

    if(!hasmore || loading) return;
    setLoading(true);

    try {
        const response = await axios.get(`http://127.0.0.1:5000/confessions/page=${page}&limit=8`);
        const newConfessions = response.data;

        setConfessions((prev)=>[...prev, ...newConfessions])    //append to old confessions
        setPage((prev)=>prev + 1) 

        if (newConfessions.length < 8) setHasmore(false); 

      } catch (error) {
        console.log(error);
      }finally {
        setLoading(false);
    }
  };


  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
      fetchConfessions();
    }
  };

  useEffect(()=>{
    fetchConfessions();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);},
  []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !message) {
      alert("Both fields are required!");
      return;
    }

    try {
      const sendResponse = await axios.post("http://127.0.0.1:5000/confess", {
        name,
        message,
      });
      alert(`${name}, your confession is saved with me!`);
      setName("");
      setMessage("");
      console.log(sendResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div>
        <h2>CONFESSIONS TILL NOW</h2>
        <ul>
          {confessions.map((item,index) => (
            <div key={index} className="border-2 h-40 w-40 bg-white flex justify-center items-center text-2xl">
              {item.name}: {item.message}
            </div>
          ))}
          {loading && <p className="text-center w-full">Loading more...</p>}
        </ul>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            placeholder="Enter a cool gibberish name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Give your confession"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <br />
          <button type="submit">Confess</button>
        </form>
      </div>
    </div>
  );
}

export default FetchData;
