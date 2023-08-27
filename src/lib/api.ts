import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://168.100.8.196/api',
})