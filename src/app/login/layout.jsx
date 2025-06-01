'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";


export default function LoginLayout({ children }) {
    const router = useRouter();
    useEffect(() => {
        if (Cookies.get("access_token")) {
            router.push("/");
        }
    }, []);
    return <>{children}</>;
};