import { api } from './client';




export async function signInApi(email: string, password: string) {
  const { data } = await api.post("/accounts/signin/", { email, password });
  return data
}

export async function signUpApi(display_name: string, email: string, password: string) {
  const { data } = await api.post("/accounts/signup/", { display_name, email, password });
  return data;
}

export async function getUserApi() {
  const { data } = await api.get("/accounts/user/")
  return data;
}
