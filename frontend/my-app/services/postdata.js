import axios from "axios"

export async function sendData(link, json) {
    const res = await axios.post(link, json)
    return res.data
}