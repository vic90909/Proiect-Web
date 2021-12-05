import axios from 'axios';

export const HTTP = axios.create({
    baseURL:"http://127.0.0.1:3000/",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
})