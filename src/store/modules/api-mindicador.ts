import axios from 'axios'

export const ApiMindicador = axios.create({
  baseURL: `https://${process.env.VUE_APP_API_MINDICADOR}/api/uf/`
})
