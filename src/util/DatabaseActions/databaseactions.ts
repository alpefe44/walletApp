import axios from 'axios'




export const fetchLogin = async (data: object) => {

    try {
        const response = await axios.post("http://192.168.1.105:3000/login", data)
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error, "error burda")
    }


}