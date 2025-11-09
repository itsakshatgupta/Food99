// src/lib/api.js
const API_URL = "https://food99api.onrender.com/api";

export async function fetchAPI(endpoint, method = "GET", body = null, token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}/${endpoint}/`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
    cache: "no-store",
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
