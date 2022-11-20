import logo from './logo.svg';
import './App.css';
import Parse from 'parse/dist/parse.min.js';

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'Ts3XlG2kIgBYVPTIlOFThW3FNGc1oeSJW1HTND1q';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'WdSRTFzRWSG7FbEkwTgvgAfiPA1Z569W1xE8nlOl';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  async function addPerson() {
    try {z
      // create a new Parse Object instance
      const Person = new Parse.Object('Person');
      // define the attributes you want for your Object
      Person.set('name', 'John');
      Person.set('email', 'john@back4app.com');
      // save it on Back4App Data Store
      await Person.save();
      alert('Person saved!');
    } catch (error) {
      console.log('Error saving new person: ', error);
    }
  }
  addPerson()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
