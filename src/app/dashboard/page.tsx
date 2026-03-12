"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { apiRequest } from "@/lib/api"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

export default function Dashboard() {

    const router = useRouter()

    const [businesses, setBusinesses] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const token = localStorage.getItem("token")

        if (!token) {
            router.push("/login")
            return
        }

        async function loadBusinesses() {

            try {

                const res = await apiRequest("/businesses", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setBusinesses(res.data || [])

            } catch (err) {

                console.error(err)

                localStorage.removeItem("token")
                router.push("/login")

            } finally {
                setLoading(false)
            }

        }

        loadBusinesses()

    }, [router])

    function logout() {

        localStorage.removeItem("token")
        router.push("/login")

    }

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        )
    }

    return (

        <div className="p-10 max-w-4xl mx-auto">

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <Button
                    variant="destructive"
                    onClick={logout}
                >
                    Logout
                </Button>

            </div>

            <div className="mb-6">

                <Button
                    onClick={() => router.push("/create-business")}
                >
                    Add Business
                </Button>

            </div>

            <div className="grid gap-4">

                {businesses.length === 0 && (
                    <p className="text-gray-500">
                        No businesses yet
                    </p>
                )}

                {businesses.map((b: any) => (
                    <Card key={b.id}>

                        <CardHeader>
                            <CardTitle>
                                {b.name}
                            </CardTitle>
                        </CardHeader>

                        <CardContent>

                            <Button
                                variant="outline"
                                onClick={() => router.push(`/business/${b.id}`)}
                            >
                                Manage
                            </Button>

                        </CardContent>

                    </Card>
                ))}

            </div>

        </div>

    )
}