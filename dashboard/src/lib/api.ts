// Auth disabled for now
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export async function fetchWithAuth(url: string, _token?: string | null, options: RequestInit = {}) {
  try {
    console.log(`[Dashboard API] Fetching: ${API_URL}${url}`);
    
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers,
    });

    console.log(`[Dashboard API] Response status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    if (response.status === 204) {
      return null;
    }

    const data = await response.json();
    console.log(`[Dashboard API] Data received:`, data);
    return data;
  } catch (error) {
    console.error(`[Dashboard API] Fetch failed for ${url}:`, error);
    return { results: [], data: [] };
  }
}

