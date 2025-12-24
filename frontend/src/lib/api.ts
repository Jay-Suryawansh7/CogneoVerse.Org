const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export async function fetchAPI(endpoint: string) {
  try {
    console.log(`[API] Fetching: ${API_URL}${endpoint}`);
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      next: { revalidate: 0 }, // Disable cache for debugging
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`[API] Response status: ${response.status}`);

    if (!response.ok) {
      let errorDetail = "";
      try {
        const errData = await response.json();
        errorDetail = JSON.stringify(errData);
      } catch {
        errorDetail = await response.text();
      }
      console.error(`[API ERROR] ${response.status} for ${endpoint}: ${errorDetail}`);
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`[API] Data received:`, data);
    return data;
  } catch (error) {
    console.error(`[API] Fetch failed for ${endpoint}:`, error);
    // Return empty array instead of throwing to prevent page crashes
    return [];
  }
}
