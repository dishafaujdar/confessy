"use client"
import './App.css'
import axios from 'axios';

function App() {

  const response = axios.get("http://127.0.0.1:5000/confessions")
  const data = response

  return (
    <>
      <div>
        hey
        
       </div>
    </>
  )
}

export default App
