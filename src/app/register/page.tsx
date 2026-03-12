"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";

export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: any) {
        e.preventDefault();

        try {

            await apiRequest("/auth/register", {
                method: "POST",
                body: JSON.stringify({ name, email, password })
            });

            window.location.href = "/login";

        } catch (err: any) {
            setError(err.message);
        }
    }

    function registerGoogle() {
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
                    Register
                </h1>

                {error && (
                    <p className="text-red-500 text-sm">
                        {error}
                    </p>
                )}

                <input
                    className="border p-2"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="border p-2"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="border p-2"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-black text-white p-2">
                    Register
                </button>

                <button
                    type="button"
                    onClick={registerGoogle}
                    className="border p-2"
                >
                    Continue with Google
                </button>

            </form>

        </div>

    );
}