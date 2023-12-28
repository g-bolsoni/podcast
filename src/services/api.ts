import axios from 'axios';

let baseURL = process.env.REACT_APP_API_BASE_URL;

if(process.env.NODE_ENV == 'production'){
    baseURL = 'https://seu-app.vercel.app/';
}

export const api = axios.create({
    baseURL: baseURL
})