import axios from "axios";

export const loginRequest = (id, password)=>{
    return axios.post('http://localhost:8080/api/login', {
        id: id,
        password: password
      })
}

export const registerRequest = (url, formData)=>{
    return  axios.post(url, formData);
} 