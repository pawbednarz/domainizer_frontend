import {Navigate, Outlet} from "react-router-dom";
import {useState} from "react";
import {RootRoute} from "../../routes/RootRoute";

export const PrivateRoute = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // TODO implement logic to get required role into route and validate it here
    // TODO validate as much fields of token as I can

    // TODO I have a feeling that it can be done in better way...
    const checkAuth = () => {
        return sessionStorage.getItem("token")
    }

    return checkAuth() ? <RootRoute><Outlet/></RootRoute> : <Navigate to="/login"/>;
};