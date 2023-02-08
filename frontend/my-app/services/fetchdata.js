import axios from "axios"

export async function getData() {
    const res = await axios.get("http://group11.exceed19.online/light")
    console.log(res.data)
    return res.data
}