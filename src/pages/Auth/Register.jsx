import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import MailIcon from "@mui/icons-material/Mail";
import KeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import titleImg from "../../assets/images/title.png";
import loginImg from "../../assets/images/log.png";

const Register = () => {
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (userData) => {
    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { user, jwt } = await registerUser(userData);
      login(user, jwt);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto border border-gray-200 rounded-lg overflow-hidden my-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section - Register Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-10 space-y-4">
            <img src={titleImg} alt="Listbnb" className="h-10 mb-4" />
            <p className="text-center text-gray-600 text-xs mb-3">
              <span className="font-bold">Listbnb</span> a Largest Classified
              Listing Marketplace offers perfect Ads classifieds...
            </p>
            <h2 className="text-xl font-semibold">Create Your Account</h2>
          </div>

          {error && (
            <div className="text-red-500 mb-6 text-center">{error}</div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit({
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value,
                confirmPassword: e.target.confirmPassword.value,
              });
            }}
            className="space-y-6"
          >
            {/* Username Field */}
            <div className="flex flex-col justify-start space-y-2">
              <label htmlFor="username" className="text-gray-700">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Type here"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-300 pr-12"
                  required
                />
                <PersonIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col justify-start space-y-2">
              <label htmlFor="email" className="text-gray-700">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Type here"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-300 pr-12"
                  required
                />
                <MailIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col justify-start space-y-2">
              <label htmlFor="password" className="text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Type here"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-300 pr-12"
                  required
                />
                <KeyIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col justify-start space-y-2">
              <label htmlFor="confirmPassword" className="text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Type here"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-300 pr-12"
                  required
                />
                <KeyIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 px-6 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
            >
              Register
              <ArrowForwardIcon className="text-white" />
            </button>
          </form>
        </div>

        {/* Right Section - Promo Content */}
        <div className="w-full md:w-1/2 bg-rose-50 p-10 flex flex-col items-center justify-center space-y-6">
          <img src={loginImg} alt="Register" className="max-w-xs mb-8" />
          <h2 className="text-2xl font-bold">
            Already Have an Account<span className="text-rose-500">?</span>
          </h2>
          <p className="text-sm text-gray-600 text-center max-w-md">
            To connect with us please login to our account if you are having one
            already.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-rose-500 hover:bg-rose-600 text-white py-3 px-8 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
          >
            Login
            <ArrowForwardIcon className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
