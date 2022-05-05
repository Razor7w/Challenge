import axios from 'axios'

export const Api = axios.create({
  baseURL: `http://${process.env.VUE_APP_API}/api/`
})
