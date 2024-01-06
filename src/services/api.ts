import axios from 'axios';

let baseURL = process.env.REACT_APP_API_BASE_URL;

export const api = axios.create({
    baseURL: baseURL
})