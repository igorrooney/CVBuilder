const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchCVs() {
    fetch("http://localhost:5078/api/cv", {
        method: "GET",
        credentials: "include",  // ✅ Ensures cookies/token are sent
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => console.log("CVs:", data))
        .catch((error) => console.error("Error fetching CVs:", error));
}


  