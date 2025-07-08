import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { FaLock, FaUser } from "react-icons/fa";
import { signIn } from "../firebase/authService";

const schema = yup.object( {
    email: yup.string().email( "Valid email is required" ).required( "Email is required" ),
    password: yup.string().required( "Password is required" ),
} ).required();

export default function AdminLogin( { onLogin } ) {
    const [isLoading, setIsLoading] = useState( false );
    const [error, setError] = useState( "" );

    const { register, handleSubmit, formState: { errors } } = useForm( {
        resolver: yupResolver( schema )
    } );

    const onSubmit = async ( data ) => {
        setIsLoading( true );
        setError( "" );

        const { user, error: authError } = await signIn( data.email, data.password );

        if ( user ) {
            onLogin( true );
        } else {
            setError( authError || "Login failed" );
        }

        setIsLoading( false );
    };

    return (
        <div className="bg-gray-950 text-white min-h-screen flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-cyan-400 mb-2">Admin Login</h1>
                    <p className="text-gray-400">Access the blog management system</p>
                </div>

                <form onSubmit={handleSubmit( onSubmit )} className="space-y-6">
                    <div>
                        <label className="block text-gray-300 mb-2">Email</label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-3 text-gray-400" />
                            <input
                                {...register( "email" )}
                                type="email"
                                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cyan-400"
                                placeholder="Enter your email"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">Password</label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-3 text-gray-400" />
                            <input
                                {...register( "password" )}
                                type="password"
                                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cyan-400"
                                placeholder="Enter your password"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {error && (
                        <div className="bg-red-900 text-red-300 p-3 rounded text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-cyan-400 text-gray-900 font-bold py-2 px-4 rounded hover:bg-cyan-300 transition disabled:opacity-50"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    <p>Create an admin account in Firebase Console:</p>
                    <p>1. Go to Firebase Console</p>
                    <p>2. Navigate to Authentication</p>
                    <p>3. Add a new user with email/password</p>
                </div>
            </motion.div>
        </div>
    );
} 