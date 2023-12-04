import axios from 'axios'





export const fetchLogin = async (data: object) => {

    try {
        const response = await axios.post("http://192.168.1.105:3000/login", data)
        //console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error, "error burda")
    }


}


export const saveItem = async (data: any) => {
    try {
        const response = await axios.post("http://192.168.1.105:3000/savedata", data)
        //console.log(response, "responsedata")
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const getItems = async (username: string) => {
    try {
        const response = await axios.get(`http://192.168.1.105:3000/getdata/${username}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const deleteItem = async (name: string, username: string) => {
    try {
        const response = await axios.delete(`http://192.168.1.105:3000/deletedata/${name}/${username}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

