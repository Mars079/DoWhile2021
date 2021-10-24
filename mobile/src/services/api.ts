import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://machineip:3000',
});