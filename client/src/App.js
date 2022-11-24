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


  return (
    <Router>
      {panel ? <Panel/>:
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setPanel={setPanel}/>}/>
          <Route path="/signup" element={<SignUp />}/>
        </Routes>
      </div>}
    </Router>
  );
}

export default App
