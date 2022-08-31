import axios from 'axios';

export const weatherAPI = async (params) => {
  return await axios.get(import.meta.env.VITE_APP_SERVICE_URL, {
    params: {
      ...params,
      appid: import.meta.env.VITE_APP_TOKEN,
      units: 'metric'
    }
  }).then(val => val.data).catch(err => err)
}