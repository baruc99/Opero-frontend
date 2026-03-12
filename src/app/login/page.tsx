"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            router.push("/dashboard");
        }

    }, [router]);

    async function handleSubmit(e: any) {
        e.preventDefault();

        try {

            const res = await apiRequest("/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password })
            });

            const token = res.data.token;

            localStorage.setItem("token", token);

            const businesses = await apiRequest("/businesses", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (businesses.data.length === 0) {
                window.location.href = "/create-business";
            } else {
                window.location.href = "/dashboard";
            }

        } catch (err: any) {
            setError(err.message);
        }
    }

    function loginGoogle() {
        window.location.href =
            `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    }

    return (

        <div className="flex h-screen items-center justify-center">

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-80"
            >

                <h1 className="text-2xl font-bold">
                    Login
                </h1>

                {error && (
                    <p className="text-red-500 text-sm">
                        {error}
                    </p>
                )}

                <input
                    className="border p-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="border p-2"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-black text-white p-2">
                    Login
                </button>

                <button
                    type="button"
                    onClick={loginGoogle}
                    className="border p-2"
                >
                    Continue with Google
                </button>

            </form>

        </div>

    );
}