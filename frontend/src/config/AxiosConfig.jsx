import axios from "axios";

export const instance = axios.create({
    // baseURL: 'http://localhost:9000',
    baseURL: 'https://cubingkerala.onrender.com',
    headers: {
        "Content-Type": 'application/json',
    }
})