import axios, { AxiosInstance } from 'axios';
import md5 from 'md5';

export class ApiService {
  static get api() {
    const timestamp = new Date().getTime();
    const apiKey = process.env.REACT_APP_ENDPOINT_PUBLIC_KEY;
    const hash = md5(`${timestamp}${process.env.REACT_APP_ENDPOINT_PRIVATE_KEY}${apiKey}`);
  
    return axios.create({
      baseURL: process.env.REACT_APP_ENDPOINT_BASE_URL,
      params: {
        ts: timestamp,
        apikey: apiKey,
        hash: hash,
      }
    });
  }
}