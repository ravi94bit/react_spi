import React from "react";
import axios from "axios";
import BASE_URL from "../../config/api";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from "../Validation/Validation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const [serverErrors, setServerErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(loginSchema) });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/login`, data);

            if (response.status === 200) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('name', response.data.user.name);
                toast.success("Logged in successfully!");
                setTimeout(() => navigate("/"), 1500);
            } else {
                toast.error("Login failed. Please try again.");
                setServerErrors({ general: 'Login failed. Please try again.' });
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                setServerErrors(error.response.data.errors);
            } else {
                setServerErrors({ general: 'Login failed. Please try again.' });
            }
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="card p-5 shadow rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4 text-primary">Welcome Back</h2>
                {serverErrors.general && <div className="text-danger mb-2">{serverErrors.general}</div>}
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                        <input
                            type="email"
                            className="form-control rounded-pill px-4 py-2"
                            id="email"
                            placeholder="Enter your email"
                            {...register("email")}
                        />
                        {errors.email && <div className="text-danger">{errors.email.message}</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label fw-semibold">Password</label>
                        <input
                            type="password"
                            className="form-control rounded-pill px-4 py-2"
                            id="password"
                            placeholder="Enter your password"
                            {...register("password")}
                        />
                        {errors.password && <div className="text-danger">{errors.password.message}</div>}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn btn-primary w-100 rounded-pill py-2 fw-bold shadow-lg transition duration-100 ${
                            loading ? "opacity-75 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? "Login..." : "Login"}
                    </button>
                    <p className="text-center mt-3 text-muted" style={{ fontSize: "0.9rem" }}>
                        Don't have an account? <a href="/register" className="text-decoration-none">Register</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
