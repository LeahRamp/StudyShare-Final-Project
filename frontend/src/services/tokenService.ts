import * as SecureStore from 'expo-secure-store';

export async function saveTokens(access: string, refresh: string) {
  await SecureStore.setItemAsync('access', access);
  await SecureStore.setItemAsync('refresh', refresh);
}

export async function getAccessToken() {
  return await SecureStore.getItemAsync('access');
}

export async function getRefreshToken() {
  return await SecureStore.getItemAsync('refresh');
}

export async function clearTokens() {
  await SecureStore.deleteItemAsync('access');
  await SecureStore.deleteItemAsync('refresh');
}