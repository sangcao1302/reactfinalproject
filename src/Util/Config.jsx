import axios from "axios";

export const httpShoe=axios.create({
    baseURL:"https://shop.cyberlearn.vn/",
    timeout:30000
})
httpShoe.interceptors.request.use((config)=>{
    return config
},err=>{
    return Promise.reject(err)
})