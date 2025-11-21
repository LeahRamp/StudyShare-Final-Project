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
  const { data } = await api.get("/accounts/user/");
  return data;
}

export async function updateUserApi(userData) {
  const sendData = new FormData();

  sendData.append('display_name', userData.display_name);
  sendData.append('profile_description', userData.profile_description);

  if (userData.profile_picture && userData.profile_picture.startsWith('file')) {
    sendData.append('profile_picture', {
      uri: userData.profile_picture,
      type: userData.pfp_info.mimeType,
      name: userData.pfp_info.fileName,
    } as any);
  }

  const { data } = await api.patch("/accounts/user/", sendData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}
