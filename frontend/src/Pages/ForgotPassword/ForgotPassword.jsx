import React, { useState } from 'react';
import './ForgotPassword.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const apiURL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";
    const handleSubmit = async (e) => {
        setError('');
        e.preventDefault();
        if(!email){
            setError("Email is required");
            return;
        }
        setIsLoading(true);
        try {
            const url = "/api/auth/forget-password";
            const payload = { email };
        
            const response = await axios.post(`${apiURL}${url}`, payload, {
                headers: { "Content-Type": "application/json" },
            });
            toast.success("Password reset link sent to your email.");
            setEmail('');
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }finally{
            setIsLoading(false);
        }
    }
  return (
    <div className="forgotpassword-container">
      <div className="forgotpassword-card">
        <h2>Forgot Your Password?</h2>
        <p>Enter your email address to receive a password reset link.</p>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit" disabled={isLoading}>{isLoading ? "Sending..." : "Send Reset Link"}</button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
