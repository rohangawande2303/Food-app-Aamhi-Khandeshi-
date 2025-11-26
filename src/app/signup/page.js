"use client";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, UserPlus, ArrowRight, CheckCircle2, Shield, User as UserIcon } from "lucide-react";

const SignupPage = () => {
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { signup, signInWithGoogle } = useAuth();
    const router = useRouter();

    // Password strength checker
    const getPasswordStrength = (pass) => {
        if (!pass) return { strength: 0, label: "", color: "" };
        let strength = 0;
        if (pass.length >= 8) strength++;
        if (pass.length >= 12) strength++;
        if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
        if (/\d/.test(pass)) strength++;
        if (/[^a-zA-Z0-9]/.test(pass)) strength++;

        if (strength <= 2) return { strength, label: "Weak", color: "bg-red-500" };
        if (strength <= 3) return { strength, label: "Fair", color: "bg-yellow-500" };
        if (strength <= 4) return { strength, label: "Good", color: "bg-blue-500" };
        return { strength, label: "Strong", color: "bg-green-500" };
    };

    const passwordStrength = getPasswordStrength(password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }
        if (!firstName.trim()) {
            return setError("Please enter your first name");
        }
        setError("");
        setIsLoading(true);
        try {
            await signup(email, password, firstName.trim());
            router.push("/");
        } catch (err) {
            setError("Failed to create an account. " + err.message);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError("");
        setIsLoading(true);
        try {
            await signInWithGoogle();
            router.push("/");
        } catch (err) {
            setError("Failed to sign in with Google. " + err.message);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f7f0dd] via-[#faf5eb] to-[#f7f0dd] p-4 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#7a5c43]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6a4e3b]/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md relative z-10"
            >
                {/* Main Card */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#e0d5c1] overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-br from-[#7a5c43] to-[#6a4e3b] p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mt-16"></div>
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mb-12"></div>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="relative"
                        >
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/30">
                                <UserPlus className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white text-center mb-2">
                                Join Us Today!
                            </h2>
                            <p className="text-white/80 text-center text-sm">
                                Create your account and start exploring
                            </p>
                        </motion.div>
                    </div>

                    {/* Form Section */}
                    <div className="p-8">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-red-700 flex items-center gap-3"
                            >
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                <p className="text-sm">{error}</p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* First Name Input */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <label className="block text-sm font-semibold text-[#7a5c43] mb-2">
                                    First Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a5c43] group-focus-within:text-[#6a4e3b] transition-colors">
                                        <UserIcon className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#e0d5c1] bg-white/50 focus:border-[#7a5c43] focus:bg-white focus:outline-none transition-all duration-300 text-[#5b4e3b]"
                                        placeholder="John"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                            </motion.div>

                            {/* Email Input */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.35 }}
                            >
                                <label className="block text-sm font-semibold text-[#7a5c43] mb-2">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a5c43] group-focus-within:text-[#6a4e3b] transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="email"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#e0d5c1] bg-white/50 focus:border-[#7a5c43] focus:bg-white focus:outline-none transition-all duration-300 text-[#5b4e3b]"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </motion.div>

                            {/* Password Input */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <label className="block text-sm font-semibold text-[#7a5c43] mb-2">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a5c43] group-focus-within:text-[#6a4e3b] transition-colors">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="password"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#e0d5c1] bg-white/50 focus:border-[#7a5c43] focus:bg-white focus:outline-none transition-all duration-300 text-[#5b4e3b]"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* Password Strength Indicator */}
                                {password && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="mt-2"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                                                    className={`h-full ${passwordStrength.color} transition-all duration-300`}
                                                />
                                            </div>
                                            <span className="text-xs font-medium text-[#7a5c43]">
                                                {passwordStrength.label}
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* Confirm Password Input */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.45 }}
                            >
                                <label className="block text-sm font-semibold text-[#7a5c43] mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a5c43] group-focus-within:text-[#6a4e3b] transition-colors">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="password"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#e0d5c1] bg-white/50 focus:border-[#7a5c43] focus:bg-white focus:outline-none transition-all duration-300 text-[#5b4e3b]"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    {confirmPassword && password === confirmPassword && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-br from-[#7a5c43] to-[#6a4e3b] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -2 }}
                                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Creating account...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Create Account</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </motion.button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#e0d5c1]"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white px-4 text-sm text-[#7a5c43]">or continue with</span>
                            </div>
                        </div>

                        {/* Google Sign-In Button */}
                        <motion.button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            className="w-full bg-white border-2 border-[#e0d5c1] text-[#5b4e3b] py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 hover:border-[#7a5c43] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span>Sign up with Google</span>
                        </motion.button>

                        {/* Login Link */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-center mt-6"
                        >
                            <p className="text-[#5b4e3b] text-sm">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="text-[#7a5c43] font-semibold hover:text-[#6a4e3b] transition-colors inline-flex items-center gap-1 group"
                                >
                                    <span>Sign in here</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Footer Text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.65 }}
                    className="text-center text-sm text-[#7a5c43] mt-6"
                >
                    Secure registration powered by Firebase Authentication
                </motion.p>
            </motion.div>
        </div>
    );
};

export default SignupPage;
