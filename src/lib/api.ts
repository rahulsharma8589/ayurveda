const BASE_URL = "http://localhost:5000/api"; // Removed /auth to allow other routes like /products

export const apiRequest = async (endpoint: string, data: any = null, method: string = "POST") => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: method,
    headers: { 
      "Content-Type": "application/json",
      // Attach the token so the 'protect' middleware knows who you are
      ...(token && { "Authorization": `Bearer ${token}` })
    },
    // GET requests cannot have a body, so we set it to null if no data
    body: data ? JSON.stringify(data) : null,
  });

  const result = await response.json();

  if (!response.ok) throw new Error(result.message || "Something went wrong");

  // If a login/register returns a new token, update it
  if (result.token) {
    localStorage.setItem("token", result.token);
  }

  return result;
};