import { BASE_URL } from '../constants';
import fetch from 'isomorphic-fetch';

type ConfigType = {
  data?: any | undefined,
  method?: string,
}

const API = {
  call: async (url: string, data: any | undefined, method = 'GET') => {
    const URL = `${BASE_URL}${url}`
    const config = {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    return fetch(URL, config).then(res => {
      return {
        total: res.headers.get('x-wp-total'),
        totalPage: res.headers.get('x-wp-totalpages'),
        data: res.json()
      }
    })
  },
  callWithAuth: async (url: string, data: any | undefined, method = "GET", token: string, isFormData = false) => {
    const URL = `${BASE_URL}${url}`
    const config = {
      method,
      headers: {
        "Authorization": 'Bearer' + ' ' + token
      },
      body: isFormData ? data : JSON.stringify(data)
    }
    return fetch(URL, config).then(res => res.json())
  },
  callWithAuthJson: async (url: string, data: any | undefined, method = "GET", token: string, isFormData = false) => {
    const URL = `${BASE_URL}${url}`
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer' + ' ' + token
      },
      body: isFormData ? data : JSON.stringify(data)
    }
    return fetch(URL, config).then(res => res.json())
  },
  callJson: async (url: string, data: any | undefined, method = 'GET') => {
    const URL = `${BASE_URL}${url}`
    const config = {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    return fetch(URL, config).then(res => res.json())
  },
};

export default API;
