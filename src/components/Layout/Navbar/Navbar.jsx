import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from "../../../config/api";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            toast.error("No authentication token found.");
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                // Clear localStorage and redirect
                localStorage.removeItem("authToken");
                localStorage.removeItem("name");
                toast.success("Logged out successfully!");
                setTimeout(() => navigate("/login"), 1500);
            } else {
                toast.error("Logout failed. Please try again.");
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Something went wrong during logout.");
           
        }
    };

    return (
        <nav className="navbar navbar-expand-sm bg-dark text-white fixed-top">
            
            <div className="container d-flex justify-content-between align-items-center w-100">
                <div className="navbar__logo">
                    <h3>HOBO</h3>
                </div>
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link text-white" href="#home">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="#about">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="#services">Services</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="#contact">Contact</a>
                    </li>
                    <li className="nav-item">
                        <button type="button" onClick={handleLogout} className="btn btn-danger text-white">
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
