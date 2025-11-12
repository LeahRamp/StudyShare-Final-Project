import { api } from "./client"

export async function getPostsApi() {
  const res = await api.get("/posts/");
  return res.data;
}