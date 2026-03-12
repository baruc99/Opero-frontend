"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function CreateBusiness() {

    const router = useRouter();

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {

        e.preventDefault();

        try {

            setLoading(true);
            setError("");

            await apiRequest("/businesses", {
                method: "POST",
                body: JSON.stringify({ name, type })
            });

            router.push("/dashboard");

        } catch (err: any) {

            setError(err.message);

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="flex h-screen items-center justify-center">

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-80"
            >

                <h1 className="text-xl font-bold">
                    Create Business
                </h1>

                {error && (
                    <p className="text-red-500">
                        {error}
                    </p>
                )}

                <input
                    className="border p-2"
                    placeholder="Business name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="border p-2"
                    placeholder="Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />

                <button
                    disabled={loading}
                    className="bg-black text-white p-2"
                >
                    {loading ? "Creating..." : "Create"}
                </button>

            </form>

        </div>

    );

}