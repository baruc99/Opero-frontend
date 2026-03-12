const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest(endpoint: string, options?: RequestInit) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers || {}),
    },
    ...options,
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "API error");
  }

  return json;
}
