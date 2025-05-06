import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import { logoutUser } from "../../../services/authService";
import store from "../../../redux/store";
import "./Navbar.css"; // Add custom CSS below

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleLogout = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            toast.error("No authentication token found.");
            return;
        }

        try {
            const response = await logoutUser(token);
            if (response.status === 200) {
                localStorage.removeItem("authToken");
                localStorage.removeItem("name");
                dispatch(logout());
                console.log("Redux State:", store.getState());
                toast.success("Logged out successfully!");
                setTimeout(() => navigate("/login"), 500);
            } else {
                toast.error("Logout failed. Please try again.");
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Something went wrong during logout.");
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
            <div className="container-fluid px-4">
                {/* Logo */}
                <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold">
                    <FaShoppingCart />
                    <span>HOB Store</span>
                </NavLink>

                {/* Toggler */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center gap-3">
                        {[
                            { to: "/", label: "Home" },
                            { to: "/about", label: "About" },
                            { to: "/services", label: "Services" },
                            { to: "/contact", label: "Contact" },
                        ].map(({ to, label }) => (
                            <li className="nav-item" key={to}>
                                <NavLink
                                    to={to}
                                    className={({ isActive }) =>
                                        `nav-link rounded-pill px-4 py-2 fw-semibold ${
                                            isActive ? "nav-active" : "nav-default"
                                        }`
                                    }
                                >
                                    {label}
                                </NavLink>
                            </li>
                        ))}

                        {/* Profile */}
                        <li className="nav-item d-flex align-items-center text-white gap-2">
                            <FaUserCircle size={22} />
                            <span className="fw-semibold">{user?.name || "Guest"}</span>
                        </li>

                        {/* Auth Button */}
                        <li className="nav-item">
                            {user ? (
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-outline-light rounded-pill px-4 py-2 logout-btn"
                                >
                                    Logout
                                </button>
                            ) : (
                                <NavLink
                                    to="/login"
                                    className="btn btn-light rounded-pill px-4 py-2 login-btn fw-semibold"
                                >
                                    Login
                                </NavLink>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
