const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchCVs() {
  try {
    const response = await fetch(`${API_BASE_URL}/cv`, {
      method: "GET",
      credentials: "include",  // ✅ Ensures cookies/token are sent
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("CVs:", data);
    return data;
  } catch (error) {
    console.error("Error fetching CVs:", error);
    throw error;
  }
}