'use client'

import axios from 'axios'
import Cookies from 'js-cookie';

const tokenRole = Cookies.get('token_role');
const value = tokenRole?.split('|');
const token = value !== undefined ? value[0] : ''

export const api = axios.create({
  baseURL: 'https://engratech11.com/api',
  headers: {
    Authorization : `Bearer ${token}`
    }
})