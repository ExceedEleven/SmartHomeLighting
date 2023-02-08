import axios from "axios"

export async function sendData(json) {
    const res = await axios.post("http://group11.exceed19.online/light/update",json)
    return res.data
}