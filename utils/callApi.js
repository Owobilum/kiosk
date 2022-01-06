import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'https://fakestoreapi.com/products'
})

export default async function callApi(url, method) {
    if (method === 'GET' || !method) {
        const res = await axiosInstance(url)
        return res
    }
}