import axios from "axios"

export async function sendData(json) {
    const res = await axios.put("http://group11.exceed19.online/light/update/front",
        {
            room_id: 1,
            is_auto: false,
            brightness: 255,
            is_on: false
        }      
)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
    return res.data
}