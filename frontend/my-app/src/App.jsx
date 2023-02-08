import  { useState, useEffect  }from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { getData, getDatabyid, getSuccess,getDatabyidBrightness } from './services/fetchdata'
import { sendData } from './services/postdata'
import LightSlider from './component/slider'
import axios from "axios"
import {Link} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)


  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => getSuccess()}>
          count is {count}
        </button>
        <p>
        <button onClick={() => getData()}/>
        <button onClick={() => sendData("bma")}/>
        <button onClick={() => console.log(getDatabyid(2))}/>

        
        {/* <input type="range" min="0" max="255" defaultValue={getDatabyidBrightness(0)}/> */}
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      <div>
        <LightSlider  />
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
    
  )
}

export default App
