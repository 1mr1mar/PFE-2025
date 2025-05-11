import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Lock, User, Eye, EyeOff } from "lucide-react";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      navigate("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-khzy relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute left-0 top-0 w-1 h-full bg-yellow-gold opacity-30 z-10" />
      <div className="absolute right-0 top-0 w-1 h-full bg-yellow-gold opacity-30 z-10" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md px-6 py-8"
      >
        <div className="bg-green-ziti/30 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-yellow-gold/20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-yellow-gold mb-2">Welcome Back</h2>
            <p className="text-gray-300">Please sign in to continue</p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6 text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label className="block text-yellow-gold text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-yellow-gold/50" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/30 border border-yellow-gold/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-gold focus:ring-1 focus:ring-yellow-gold transition-colors"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label className="block text-yellow-gold text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-yellow-gold/50" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-black/30 border border-yellow-gold/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-gold focus:ring-1 focus:ring-yellow-gold transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-yellow-gold/50 hover:text-yellow-gold transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-yellow-gold text-green-ziti py-3 rounded-lg font-medium text-lg shadow-lg hover:shadow-yellow-gold/30 transition-all duration-300"
              >
                Sign In
              </motion.button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 text-center text-sm text-gray-300"
          >
            <p>Default credentials:</p>
            <p className="text-yellow-gold/70">Username: admin</p>
            <p className="text-yellow-gold/70">Password: 123456</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
