const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest(
  endpoint: string,
  options?: RequestInit
) {

  const res = await fetch(`${API_URL}${endpoint}`,{
    headers:{
      "Content-Type":"application/json",
      ...(options?.headers || {})
    },
    ...options
  });

  if(!res.ok){
    const error = await res.json();
    throw new Error(error.message || "API error");
  }

  return res.json();
}