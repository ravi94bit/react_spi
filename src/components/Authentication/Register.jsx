import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../../config/api";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from "../Validation/Validation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [serverErrors, setServerErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(registerSchema) });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/register`, data);

            if (response.status === 200) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('name', response.data.user.name);
                toast.success("Registered successfully!");
                setTimeout(() => navigate("/"), 1500);
            } else {
                toast.error("Registration failed. Please try again.");
                setServerErrors({ general: 'Registration failed. Please try again.' });
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                setServerErrors(error.response.data.errors);
            } else {
                setServerErrors({ general: 'Registration failed. Please try again.' });
            }
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="card p-5 shadow-lg rounded-4" style={{ maxWidth: "450px", width: "100%", background: "linear-gradient(145deg, #ffffff, #f0f4f8)" }}>
                <h2 className="text-center mb-4 text-primary font-weight-bold" style={{ fontSize: "2.2rem", letterSpacing: "0.5px" }}>
                    Create an Account
                </h2>

                {serverErrors.general && <div className="text-danger mb-2">{serverErrors.general}</div>}

                <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-semibold" style={{ fontSize: "1rem", color: "#555" }}>Name</label>
                        <input
                            type="text"
                            autoComplete="name"
                            className="form-control rounded-pill px-4 py-2 border-0 shadow-sm focus:ring-2 focus:ring-primary transition duration-300"
                            id="name"
                            placeholder="Enter your name"
                            {...register("name")}
                        />
                        {errors.name && <div className="text-danger">{errors.name.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold" style={{ fontSize: "1rem", color: "#555" }}>Email Address</label>
                        <input
                            type="email"
                            autoComplete="email"
                            className="form-control rounded-pill px-4 py-2 border-0 shadow-sm focus:ring-2 focus:ring-primary transition duration-300"
                            id="email"
                            placeholder="Enter your email"
                            {...register("email")}
                        />
                        {errors.email && <div className="text-danger">{errors.email.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-semibold" style={{ fontSize: "1rem", color: "#555" }}>Password</label>
                        <input
                            type="password"
                            autoComplete="new-password"
                            className="form-control rounded-pill px-4 py-2 border-0 shadow-sm focus:ring-2 focus:ring-primary transition duration-300"
                            id="password"
                            placeholder="Enter a password"
                            {...register("password")}
                        />
                        {errors.password && <div className="text-danger">{errors.password.message}</div>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirm_password" className="form-label fw-semibold" style={{ fontSize: "1rem", color: "#555" }}>Confirm Password</label>
                        <input
                            type="password"
                            autoComplete="new-password"
                            className="form-control rounded-pill px-4 py-2 border-0 shadow-sm focus:ring-2 focus:ring-primary transition duration-300"
                            id="confirm_password"
                            placeholder="Re-enter your password"
                            {...register("password_confirmation")}
                        />
                        {errors.password_confirmation && <div className="text-danger">{errors.password_confirmation.message}</div>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn btn-primary w-100 rounded-pill py-2 fw-bold shadow-lg transition duration-300 ${
                            loading ? "opacity-75 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                    <p className="text-center mt-3 text-muted" style={{ fontSize: "0.9rem" }}>
                        Already have an account?{" "}
                        <a href="/login" className="text-decoration-none text-primary hover:text-blue-500 transition duration-300">
                            Login
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
