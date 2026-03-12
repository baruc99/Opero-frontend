"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function Dashboard() {

    const router = useRouter();

    const [businesses, setBusinesses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }

        async function loadBusinesses() {

            try {

                const res = await apiRequest("/businesses");

                console.log(res);


                setBusinesses(res.data || []);

            } catch (err) {

                console.error(err);

                localStorage.removeItem("token");
                router.push("/login");

            } finally {

                setLoading(false);

            }

        }

        loadBusinesses();

    }, []);

    function logout() {

        localStorage.removeItem("token");
        router.push("/login");

    }

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-10">

            <div className="flex justify-between items-center">

                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>

            </div>

            <div className="mt-6">

                <button
                    onClick={() => router.push("/create-business")}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Add Business
                </button>

            </div>

            <div className="mt-6">

                {businesses.length === 0 && (
                    <p>No businesses yet</p>
                )}

                {businesses.map((b: any) => (
                    <div
                        key={b.id}
                        className="border p-3 mb-2 rounded"
                    >
                        {b.name}
                    </div>
                ))}

            </div>

        </div>
    );

}