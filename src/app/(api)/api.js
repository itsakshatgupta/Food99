// utils/apiFetch.js
const production_url = "https://food99api.onrender.com/api"
const dev_url = "http://localhost:8000/api" 

const BASE_URL = production_url;

export async function apiFetch(url, options = {}) {
  // --- add access token ---
  const access = localStorage.getItem("access_token");
  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
  };
  if (access) {
    headers["Authorization"] = `Bearer ${access}`;
  }

  let response = await fetch(BASE_URL + url, { ...options, headers });

  // --- if unauthorized, try refresh ---
  if (response.status === 401) {
    const refresh = localStorage.getItem("refresh");
    if (refresh) {
      try {
        const refreshResponse = await fetch(BASE_URL + "/api/token/refresh/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh }),
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          localStorage.setItem("access", data.access);

          // retry original request with new token
          headers["Authorization"] = `Bearer ${data.access}`;
          response = await fetch(BASE_URL + url, { ...options, headers });
        } else {
          // refresh failed → logout
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
        }
      } catch (err) {
        console.error("Refresh request failed:", err);
      }
    }
  }

  return response;
}
