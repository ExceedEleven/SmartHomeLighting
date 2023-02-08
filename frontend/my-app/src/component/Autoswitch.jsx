import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState } from 'react';
import { getDatabyid } from '../services/fetchdata';
import { sendData } from '../services/postdata';
function func(){
    return 1
}
const AutoSwitch = ({room_id}) => {
    const [check, setCheck] = useState(false)
    const [light, setlight] = useState({})
     useEffect(() => {
        const interval = setInterval(async () => {
          getDatabyid(room_id).then((data) => {
            setCheck(data.result.is_auto);
            setlight(data.result);
          });
        }, 1000);
    
        return () => clearInterval(interval);
      });
    const handleChange = () => {
        light.is_auto=!check
        setCheck(!check)
        sendData(light)
        getDatabyid(room_id).then((data) => {
            setCheck(data.result.is_auto);
            setlight(data.result);
          });
    }
    return(
        <div className='Switch'>
            <FormControlLabel 
            label={check ? "auto on":"auto off"}
            control={<Switch checked={check} onChange={handleChange} color="warning"/>}/>
        </div>
    )
}
export default AutoSwitch