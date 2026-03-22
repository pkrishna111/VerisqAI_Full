const API_BASE_URL = "https://localhost:7183";

//for registration of user through token
export const registerUser = async (data) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
    }

    return response.json();
};

//for authentication request to protect dashboard
export const apiRequest = async (endpoint, method = "GET", body = null) => {

    const token = localStorage.getItem("token");
    
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
        },
        body: body ? JSON.stringify(body) : null
    });

    //this will auto logout if token is invalid
    if (res.status === 401) {
        console.error("Unauthorized - token invalid");
        localStorage.removeItem("token");
        window.location.href = "/";
        return;
    }

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
    }

    return res.json();
};