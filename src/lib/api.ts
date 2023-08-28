'use client'

import axios from 'axios'
import Cookies from 'js-cookie';

const token = Cookies.get('token')

export const api = axios.create({
  baseURL: 'https://engratech11.com/api',
  headers: {
    Authorization : `Bearer ${token}`
    }
})