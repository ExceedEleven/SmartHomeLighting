import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState } from 'react';
const Checkswitch = ({room_id}) => {
    const [check, setCheck] = useState(false)
    const [light, setlight] = useState({})
    console.log({check})
    useEffect(() => {
         getDatabyID(room_id).then((data) => {
            setCheck(data.is_on)
            setlight(data)
         })
     })
    const handleChange = () => {
        setCheck(!check)
        
        
    }
    return(
        <div>
            <FormControlLabel 
            label={check ? "on":"off"}
            control={<Switch checked={check} onChange={handleChange}/>}/>
        </div>
    )
}
export default Checkswitch