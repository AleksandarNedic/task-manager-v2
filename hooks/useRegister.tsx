"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function useRegister() {
    const [error, setError] = useState("");

    const register = async (
        email: string,
        password: string,
    ) => {
        setError("");

        if (!email.includes("@")) {
            setError("Please enter a valid email");
            return false;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);

            console.log("Registration successful");

            return true;
        } catch (error) {
            setError("Registration failed");

            return false;
        }
    };

    return {
        register,
        error,
    };
}