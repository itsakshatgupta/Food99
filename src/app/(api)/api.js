// src/lib/api.js

// const API_URL = "https://food99api.onrender.com/api";
const API_URL = "http://127.0.0.1:8000/api";

export async function fetchAPI(endpoint, method = "GET", body = null, auth_verify = false, c_type = 'application/json') {
  // 🔹 remove extra slash if user passes "/token"
  const cleanEndpoint = endpoint.replace(/^\/+/, "");
  const url = `${API_URL}/${cleanEndpoint}/`;

  let options = { method, headers: {}, cache: "no-store" };
  switch (c_type) {
    case 'FormData':
      options.body = body ? body : null;
      break;
    default:
      options.headers["Content-Type"] = "application/json";
      options.body = body ? JSON.stringify(body) : null;
      break;
  }
  if (auth_verify) {
    const token = localStorage.getItem("access"); // or from cookies
    options.headers["Authorization"] = `Bearer ${token}`;

  }

  let res = await fetch(url, options);

  // 🧠 If token expired, Django returns 401
  if (res.status === 401 && localStorage.getItem("refresh")) {
    console.warn("Access token expired, refreshing...");
    const newAccess = await refreshAccessToken();

    if (newAccess) {
      options.headers["Authorization"] = `Bearer ${newAccess}`;
      res = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
        cache: "no-store",
      });
    }
  }

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// 🔄 Helper: refresh the access token using refresh token
async function refreshAccessToken() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;

  const res = await fetch(`${API_URL}/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    console.error("Refresh token expired — logging out");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    return null;
  }

  const data = await res.json();
  localStorage.setItem("access", data.access);
  return data.access;
}