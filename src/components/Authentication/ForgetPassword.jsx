import React, {useState} from "react";
import { forgetPasswordSchema } from "../Validation/Validation";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { forgetPassword } from "../../services/authService"; 
import { toast, ToastContainer } from "react-toastify";

const ForgetPassword = () => {
    const [loading, setLoading] = useState(false);

    const {
            register,
            handleSubmit,
            formState: { errors }
        } = useForm({ resolver: yupResolver(forgetPasswordSchema) });
     
        const onSubmit = async (data) => {
            setLoading(true);

            try {
                const response = await forgetPassword(data);

                toast.success(response.data.message || "Reset link sent successfully.");
                
            } catch (error) {
                if (error.response?.data?.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Something went wrong.");
                }
            }finally {
                setLoading(false);
            }

        }



    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="card p-5 shadow rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="text-center mb-4 text-primary">Forgot Password</h3>
                <form form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                        <input
                            type="email"
                            className="form-control rounded-pill px-4 py-2"
                            id="email"
                            placeholder="Enter your email"
                            {...register("email", { required: "Email is required" })}
                        />
                         {errors.email && <div className="text-danger">{errors.email.message}</div>}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn btn-primary w-100 rounded-pill py-2 fw-bold shadow-lg ${
                            loading ? "opacity-75 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                    <p className="text-center mt-3 text-muted" style={{ fontSize: "0.9rem" }}>
                        Go back to <a href="/login" className="text-decoration-none">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
