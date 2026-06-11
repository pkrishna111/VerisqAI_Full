import { Navigate } from "react-router-dom";
import {
    isAuthenticated,
    getRole
} from "../utils/auth";

function AdminRoute({ children }) {

    if (!isAuthenticated()) {
        return <Navigate to="/" replace />;
    }

    const role = getRole();

    if (role !== "Admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default AdminRoute;