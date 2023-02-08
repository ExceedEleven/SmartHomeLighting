import React, { useState, useEffect } from 'react'
// import ReactSlider from "react-slider"
import { getDatabyid, getDatabyidBrightness } from "../services/fetchdata";
const LightSlider = ({ data }) => {
    const [defnum, setdefnum] = useState(null)

    useEffect(() => {
        getDatabyidBrightness(1).then(data => setdefnum(data))
    })
    // console.log(id)
    // console.log(typeof(id))
    // console.log(getDatabyid(id).result.brightness)
    // console.log(data)
    // const num = data.result.brightness
    // console.log(num)
    // console.log(typeof(num))
    // console.log(toString(num))
    console.log(defnum)
    if(defnum!==null){
    return (
        // <div>
            
        console.log(defnum)
        // </div>
    )
    }
}
export default LightSlider