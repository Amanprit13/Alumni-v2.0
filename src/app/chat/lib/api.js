export const API_BASE_URL = "http://localhost:5000/api";

export const fetchWithAuth = async (url, token, options = {}) => {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
  if (!res.ok) throw new Error("API request failed");
  return res.json();
};
