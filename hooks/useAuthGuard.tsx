import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function useAuthGuard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser:any) => {
            if (!currentUser) {
                router.push("/login");
                return;
            }
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    return { user, loading };
}