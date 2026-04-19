const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const fetchApprovedPosts = async () => {
  const res = await fetch(`${BASE_URL}/api/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

export const submitPost = async (postData) => {
  const res = await fetch(`${BASE_URL}/api/posts/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  if (!res.ok) throw new Error("Failed to submit post");
  return res.json();
};

export const adminLogin = async (email, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
};

export const fetchAllPosts = async (token) => {
  const res = await fetch(`${BASE_URL}/api/posts/admin`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
};

export const approvePost = async (id, token) => {
  const res = await fetch(`${BASE_URL}/api/posts/approve/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to approve");
  return res.json();
};

export const rejectPost = async (id, token, reason) => {
  const res = await fetch(`${BASE_URL}/api/posts/reject/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reason }),
  });
  if (!res.ok) throw new Error("Failed to reject");
  return res.json();
};

export const deletePost = async (id, token) => {
  const res = await fetch(`${BASE_URL}/api/posts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete");
  return res.json();
};
