"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function useRegister() {
  const [error, setError] = useState("");

  const register = async (email: string, password: string) => {
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // Firebase automatski prijavi korisnika poslije registracije,
      // pa ga odjavljujemo da poruka "You can now log in" bude tačna
      await signOut(auth);

      return true;
    } catch (err) {
      const e = err as {
        code?: string;
      };

      const code = e.code ?? "";

      console.error("Firebase registration error:", code);

      if (code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else if (code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (code === "auth/weak-password") {
        setError("Password does not meet the security requirements.");
      } else if (code === "auth/operation-not-allowed") {
        setError("Registration is currently unavailable.");
      } else if (code === "auth/network-request-failed") {
        setError("Network error. Check your internet connection.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Registration failed. Please try again.");
      }

      return false;
    }
  };

  return {
    register,
    error,
  };
}
