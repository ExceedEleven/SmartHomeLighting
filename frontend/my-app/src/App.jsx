import { useState } from 'react'
import './App.css'
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormGroup } from '@mui/material';
import Checkswitch from './component/Checkswitch';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div>
        <h1 className='asd'>Room</h1>
      </div>
        <FormGroup>
          <FormControlLabel label="Room1" control={<Checkswitch room_id={0} />}/>
          <FormControlLabel label="Room2" control={<Checkswitch room_id={1}/>}/>
          <FormControlLabel label="Room3" control={<Checkswitch room_id={2}/>}/>
        </FormGroup>
    </div>
  )
}

export default App
