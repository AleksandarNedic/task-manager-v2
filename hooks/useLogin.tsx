import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function useLogin() {
    const [error, setError] = useState("");
    const router = useRouter();

    const login = async (email: string, password: string) => {
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/tasks')
            console.log("Login successful");
        } catch (error) {
            setError("Invalid email or password..");
        }
    };

    return {
        login,
        error,
    };
}