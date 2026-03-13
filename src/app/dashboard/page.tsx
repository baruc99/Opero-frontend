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

        <div className="p-10 max-w-5xl mx-auto">

            <div className="flex justify-between items-center mb-10">

                <h1 className="text-3xl font-bold">
                   Opero
                </h1>

                <Button
                    variant="destructive"
                    onClick={logout}
                >
                    Logout
                </Button>

            </div>

            <div className="mb-8">

                <Button
                    onClick={() => router.push("/create-business")}
                >
                    Create Business
                </Button>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

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

                        <CardContent className="flex gap-3 flex-wrap">

                            <Button
                                variant="outline"
                                onClick={() => router.push(`/business/${b.id}/services`)}
                            >
                                Services
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => router.push(`/business/${b.id}/staff`)}
                            >
                                Staff
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => router.push(`/business/${b.id}`)}
                            >
                                Settings
                            </Button>

                        </CardContent>

                    </Card>
                ))}

            </div>

        </div>

    )
}