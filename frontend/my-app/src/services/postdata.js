import axios from "axios"
import { getDatabyid } from "./fetchdata";

export async function sendData(json) {
    const res = await axios.put("http://group11.exceed19.online/light/update/front",
       json 
)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
    return res.data
}