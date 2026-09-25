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
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }



        try {
            await createUserWithEmailAndPassword(auth, email, password);

            console.log("Registration successful");
        } catch (error) {
            setError("Registration failed");
        }
    };

    return {
        register,
        error,
    };
}