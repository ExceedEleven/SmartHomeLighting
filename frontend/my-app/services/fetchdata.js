import axios from "axios"

export async function getData(link) {
    const res = await axios.get(link)
    return res.data
}