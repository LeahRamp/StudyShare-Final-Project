import { getRefreshToken, saveTokens } from '../tokenService';
import { api } from './client';




export async function signInApi(email: string, password: string) {
  const { data } = await api.post("/accounts/signin/", { email, password });
  if (data.access && data.refresh) await saveTokens(data.access, data.refresh);
}

export async function signUpApi(display_name: string, email: string, password: string) {
  const { data } = await api.post("/accounts/signup/", { display_name, email, password });
  if (data.access && data.refresh) await saveTokens(data.access, data.refresh);
}
