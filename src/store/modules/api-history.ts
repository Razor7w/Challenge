import axios from 'axios'

export const ApiHistory = axios.create({
  baseURL: `http://${process.env.VUE_APP_API_HISTORY}:3000/history`
})
