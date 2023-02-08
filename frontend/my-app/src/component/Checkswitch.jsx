import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState } from 'react';
import { getDatabyid } from '../services/fetchdata';
import { sendData } from '../services/postdata';
function func(){
    return 1
}
const Checkswitch = ({room_id}) => {
    const [check, setCheck] = useState(false)
    const [light, setlight] = useState({})
    useEffect(() => {
         getDatabyid(room_id).then((data) => {
            setCheck(data.result.is_on)
            setlight(data.result)
         })
     })
    const handleChange = () => {
        light.is_on=!check
        setCheck(!check)
        sendData(light)
    }
    return(
        <div className='Switch'>
            <FormControlLabel 
            label={check ? "on":"off"}
            control={<Switch checked={check} onChange={handleChange} color="warning"/>}/>
        </div>
    )
}
export default Checkswitch