import axios from "axios"

const BASE_URL = 'https://next-gen-image-server.vercel.app/api'

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

