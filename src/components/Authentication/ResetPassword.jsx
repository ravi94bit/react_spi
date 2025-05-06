import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordSchema } from "../Validation/Validation";
import { resetPassword } from "../../services/authService";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(resetPasswordSchema),
        defaultValues: { email, token }
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await resetPassword(data);
            toast.success(response.data.message || "Password reset successfully.");
            setTimeout(() => navigate("/login"), 1000);
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="card p-4 shadow rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="text-center text-primary mb-4">Reset Your Password</h3>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <input type="hidden" value={token} {...register("token")} />
                    <input type="hidden" value={email} {...register("email")} />

                    <div className="mb-3">
                        <label className="form-label fw-semibold">New Password</label>
                        <input
                            type="password"
                            className="form-control rounded-pill px-4 py-2"
                            placeholder="Enter new password"
                            {...register("password")}
                        />
                        {errors.password && <small className="text-danger">{errors.password.message}</small>}
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-semibold">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control rounded-pill px-4 py-2"
                            placeholder="Confirm password"
                            {...register("password_confirmation")}
                        />
                        {errors.password_confirmation && <small className="text-danger">{errors.password_confirmation.message}</small>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-100 rounded-pill py-2 fw-bold"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
