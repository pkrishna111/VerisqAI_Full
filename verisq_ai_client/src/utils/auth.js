import { jwtDecode } from "jwt-decode";

export const getToken = () => {
    return localStorage.getItem("token");
};

export const removeToken = () => {
    localStorage.removeItem("token");
};

export const isAuthenticated = () => {
    const token = getToken();

    if (!token) return false;

    try {
        const decoded = jwtDecode(token);

        const currentTime = Date.now() / 1000;

        return decoded.exp > currentTime;
    }
    catch {
        return false;
    }
};

export const getRole = () => {
    const token = getToken();

    if (!token) return null;

    try {
        const decoded = jwtDecode(token);

        return (
            decoded[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ] || null
        );
    }
    catch {
        return null;
    }
};