import axios from 'axios'

function normalizeBaseUrl(url) {
  return String(url || '').replace(/\/+$/, '')
}

const baseURL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL) || 'http://localhost:3000/api/v1'

export const api = axios.create({
  baseURL,
  withCredentials: true,
})
