import axios from 'axios';

let baseURL = process.env.REACT_APP_API_BASE_URL;

if (process.env.NODE_ENV == 'production') {
    baseURL = 'https://8f7f-189-41-198-46.ngrok-free.app';
}

export const api = axios.create({
    baseURL: baseURL
})