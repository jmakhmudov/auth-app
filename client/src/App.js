import React from "react"
import './styles/App.css'
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Panel from "./components/Panel"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  const [panel, setPanel] = React.useState(false)
  const [id, setId] = React.useState('')


  return (
    <Router>
      {panel ? <Panel id={id}/>:
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setPanel={setPanel} setId={setId}/>}/>
          <Route path="/signup" element={<SignUp />}/>
        </Routes>
      </div>}
    </Router>
  );
}

export default App
