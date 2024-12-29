import React, { useState } from "react";
import axiosInstance from "../utils/axios.js";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Xử lý thay đổi trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axiosInstance.post("http://localhost:8000/api/v1/buyer/login", {
        email: formData.email,
        password: formData.password,
      });
      setSuccess(response.data.message);
      Cookies.set("token", response.data.token, { expires: 7 });
      window.location.replace("/")
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                  Sign in to your account and explore a world of possibilities. Your journey begins here.
                </p>
              </div>

              {/* Input email */}
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                  placeholder="Enter your email"
                />
              </div>

              {/* Input password */}
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                  placeholder="Enter your password"
                />
              </div>

              <Link to="/register">
                <p className="text-blue-500 text-sm">Chưa có tài khoản?</p>
              </Link>

              {/* Nút submit */}
              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-pink-300 hover:bg-blue-700 focus:outline-none"
                >
                  Log in
                </button>
              </div>

              {/* Hiển thị lỗi */}
              {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

              {/* Hiển thị thông báo thành công */}
              {success && <p className="text-green-500 text-sm mt-4">{success}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;