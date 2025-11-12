import axios from 'axios';
import { getAccessToken, getRefreshToken, saveTokens } from '../tokenService';

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
  console.log("Request:", config.url, config.headers.Authorization, config.data); // TODO: temp line
  if (isProtected(config.url)) {
    const token = await getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config
});


async function refreshTokenApi() {
  const refresh = getRefreshToken();
  const { data } = await api.post("/accounts/token-refresh/", { refresh });
  if (data.access && data.refresh) await saveTokens(data.access, data.refresh);
  return data.access
}


api.interceptors.response.use(
  res => {
    console.log("response success:", res.status, res.config.url, res.data); // TODO: temp block
    return res;
  },
  async (error) => {
    const { config, response } = error;
    console.log("response Error:", response._retry, response.status, response.data) // TODO: temp line
    
    if (error.code === 'ECONNABORTED') {
      console.log("request timed out");
      return Promise.reject({ message: 'request timed out'})
    }
    
    if (response?.status == 401 && !config._retry && isProtected(config.url)) {
      config._retry = true;
      
      const access = await refreshTokenApi()
      
      if (access) {
      return api(config.headers.Authorization = `Bearer ${access}`);
    }
  } 
  
  return Promise.reject(error);
})
