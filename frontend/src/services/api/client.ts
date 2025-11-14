import axios from 'axios';
import { clearTokens, getAccessToken, getRefreshToken, saveTokens } from '../tokenService';
import { processDrfErrors } from '../../utils/processDrfErrors';

const PROTECTED_PATHS = [
  "user/",
  "reset-password/",
  "posts/",
]

const isProtected = (url?: string) => {
  if (!url) return false
  return PROTECTED_PATHS.some(path => url.includes(path));
}


export const api = axios.create({
  baseURL: "http://192.168.1.62:8000/api", // Will probably need changed
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  if (isProtected(config.url)) {
    const token = await getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config
});


export async function refreshTokenApi() {
  const refresh = await getRefreshToken();
  if (!refresh) throw new Error("No refresh token found");

  const { data } = await api.post("/accounts/token-refresh/", { refresh });
  await saveTokens(data.access, data.refresh);
  return data.access
}


api.interceptors.response.use(
  res => {
    return res;
  },
  async (error) => {
    const { config, response, code } = error;

    if (code === 'ECONNABORTED') {
      return Promise.reject({ message: 'request timed out.'});
    }

    if (!response) {
      return Promise.reject({ message: 'Server Connection Error.'});
    }
    
    if (response?.status == 401 && !config._retry && isProtected(config.url)) {
      config._retry = true;
      try {
        const access = await refreshTokenApi()
        config.headers.Authorization = `Bearer ${access}`;
        return api(config);
      } catch {
        await clearTokens();
        return Promise.reject({ message: 'Session expired. Please login again.'});
      }
    } 
  
  const processed = processDrfErrors(response.data)
  return Promise.reject(processed);
  }
)
