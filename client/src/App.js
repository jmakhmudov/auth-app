import React from "react"
import './styles/App.css'
import Login from "./components/Login"
import axios from 'axios'

function App() {
  axios.get('https://server-production-8787.up.railway.app/api/get').then(resp => {
    console.log(resp.data);
  });
  
  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default App
