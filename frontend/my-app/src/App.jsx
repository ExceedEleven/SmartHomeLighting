import { useState } from 'react'
import './App.css'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkswitch from './component/Checkswitch';
import AutoSwitch from './component/Autoswitch';
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
            <FormControlLabel control={<AutoSwitch room_id={0} className='Switch'/>}/>
          </div>
          <div className="room">
            <p>Room 2</p>
            <FormControlLabel control={<Checkswitch room_id={1}/>}/>
            <FormControlLabel control={<AutoSwitch room_id={1} className='Switch'/>}/>
          </div>
          <div className="room">
            <p>Room 3</p>
            <FormControlLabel control={<Checkswitch room_id={2}/>}/>
            <FormControlLabel control={<AutoSwitch room_id={2} className='Switch'/>}/>
          </div>        
        </div>
    </div>
  )
}

export default App
