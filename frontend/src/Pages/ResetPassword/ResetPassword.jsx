import React, { useState, useEffect } from 'react';
import './ResetPassword.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';


const ResetPassword = () => {
  const apiURL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {

    if (!token) {
      navigate("/");
    }
  }, [token]);

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setSubmitting(true);
      const res = await axios.post(`${apiURL}/api/auth/reset-password`, {
        token,
        newPassword
      });
      toast.success(res.data.message);
      setTimeout(() => navigate("/", { state: { showLogin: true } }), 2000);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="resetpassword-container">
      <div className="resetpassword-card">
        <h2>Reset Your Password</h2>
        <p>Enter your new password below.</p>
        <form onSubmit={handleReset}>
          <input type="password" placeholder="New Password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button type="submit" disabled={submitting}>{submitting ? "Resetting..." : "Reset Password"}</button>
          <p>Request a new reset password link? <Link to="/forgot-password">Forgot Password</Link></p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
