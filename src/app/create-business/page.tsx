"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";

export default function CreateBusiness() {

    const [name, setName] = useState("");
    const [type, setType] = useState("");

    async function handleSubmit(e: any) {

        e.preventDefault();

        const token = localStorage.getItem("token");

        await apiRequest("/businesses", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name, type })
        });

        window.location.href = "/dashboard";
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

                <input
                    className="border p-2"
                    placeholder="Business name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="border p-2"
                    placeholder="Type"
                    onChange={(e) => setType(e.target.value)}
                />

                <button className="bg-black text-white p-2">
                    Create
                </button>

            </form>

        </div>

    );

}