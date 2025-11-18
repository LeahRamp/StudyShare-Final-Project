import { api } from "./client"


export interface Post {
  id: number;
  author: string;
  subject: string;
  title?: string;
  text: string;
  link?: string;
  image?: string;
  document?: string;
  created_at?: string;
  likes_count?: number;
  user_has_liked?: boolean;
}

// Get all posts 
export async function getPostsApi() {
  const res = await api.get("/posts/");
  return res.data;
}

//Get all posts for the logged in user 
export async function getMyPostsApi() {
  const res = await api.get("/posts/my-posts/");
  return res.data;
}

// Get posts liked by the user
export async function getLikedPostsApi() {
  const res = await api.get("/posts/liked/");
  return res.data;
}

// Create a new post 
export async function createPostApi(postData: Partial<Post>) {
  const res = await api.post("/posts/create/", postData);
  return res.data;
}

// Like or unlike a post 
export async function likePostApi(postId: number) {
  const res = await api.post(`/posts/${postId}/like/`);
  return res.data;
}

// Create a posts report 
export async function reportPost(postId: number, reason: string) {
  const res = await api.post("/posts/report/", {post: postId, reason});
  return res.data;
}

// Get all reports 
export async function getAdminReportsApi() {
  const res = await api.get("/posts/admin/reports/");
  return res.data;
}

// Review a report 
export async function reviewAdminReportApi(reportId: number, action: 'approve' | 'reject') {
  const res = await api.post(`/posts/admin/reports/${reportId}/review/`, { action });
  return res.data;
}

// Search posts by keyword or subject 
export async function searchPostApi(query) {
  const res = await api.get(`/posts/?search=${query}`);
  return res.data;
}

// Filter posts by subject
export async function filterPostBySubject(subject) {
  const res = await api.get(`/posts/?subject=${subject}`);
  return res.data;
}