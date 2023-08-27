import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://engratech11.com/api',
})