"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function useRegister() {
    const [error, setError] = useState("");

    const register = async (email: string, password: string) => {
        
        setError("");

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            console.log(
                "Account created:",
                userCredential.user.email
            );

            return true;
        } catch (err) {
            const e = err as {
                code?: string;
                message?: string;
            };

            const code = e.code ?? "";
            const msg = e.message ?? "";

            console.error(
                "Firebase registration error:",
                code,
                msg
            );

            if (
                code === "auth/email-already-in-use" ||
                msg.includes("EMAIL_EXISTS") ||
                msg.includes("email-already-in-use")
            ) {
                setError(
                    "An account with this email already exists."
                );
            } else if (code === "auth/invalid-email") {
                setError(
                    "Please enter a valid email address."
                );
            } else if (code === "auth/weak-password") {
                setError(
                    "Password is too weak. Use at least 8 characters."
                );
            } else if (code === "auth/operation-not-allowed") {
                setError(
                    "Email/Password sign-in is not enabled in Firebase."
                );
            } else if (code === "auth/network-request-failed") {
                setError(
                    "Network error. Check your internet connection."
                );
            } else if (code === "auth/too-many-requests") {
                setError(
                    "Too many attempts. Please try again later."
                );
            } else {
                setError(
                    "Registration failed. Please try again."
                );
            }

            return false;
        }
    };

    return {
        register,
        error,
    };
}