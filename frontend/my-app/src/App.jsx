
import { useState } from 'react'
import './App.css'
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormGroup } from '@mui/material';
import Checkswitch from './component/Checkswitch';
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
    <div>
      <div>

        <h1 className='Header'>Room</h1>
      </div >
        <div className='Switch'>
          <div className="room">
            <p>Room 1</p>
            <FormControlLabel control={<Checkswitch room_id={0} className='Switch'/>}/>
          </div>
          <div className="room">
            <p>Room 2</p>
            <FormControlLabel control={<Checkswitch room_id={1}/>}/>
          </div>
          <div className="room">
            <p>Room 3</p>
            <FormControlLabel control={<Checkswitch room_id={2}/>}/>
          </div>        
        </div>

    </div>
    
  )
}

export default App
