import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import UserPage from "../pages/UserPage";
import ManagerPage from "../pages/ManagerPage";

function PageRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/UserPage" element={<UserPage />} />
                <Route path="/ManagerPage" element={<ManagerPage />} />
            </Routes>
        </Router>
    );
}

export default PageRoutes;
