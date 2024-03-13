import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import UserPage from "../pages/UserPage";
import ManagerPage from "../pages/ManagerPage";
import ManagerOnly from "../pages/ManagerOnly";

import ProtectedRoute from "./ProtectedRoute";

function PageRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
                    <Route path="/UserPage" element={<UserPage />} />
                </Route>
                
                <Route element={<ProtectedRoute allowedRoles={["manager"]} />}>
                    <Route path="/ManagerPage" element={<ManagerPage />} />
                    <Route path="/ManagerOnly" element={<ManagerOnly />} />
                </Route>

            </Routes>
        </Router>
    );
}

export default PageRoutes;
