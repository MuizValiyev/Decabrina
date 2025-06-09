'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function cartLayout({children}){
    const router = useRouter();
    useEffect(() => {
        if (!Cookies.get('access_token')) {
            router.push('/login');
        }
    }, []);

    return <>{children}</>
}