import React from "react"
import './styles/App.css'
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App
