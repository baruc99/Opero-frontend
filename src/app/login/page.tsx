"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { apiRequest } from "@/lib/api"

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: any) {

        e.preventDefault()
        setLoading(true)

        const res = await apiRequest("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password })
        })

        localStorage.setItem("token", res.data.token)

        window.location.href = "/dashboard"
    }

    return (

        <div className="flex h-screen items-center justify-center bg-gray-50">

            <Card className="w-[380px]">

                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>

                <CardContent>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >

                        <Input
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button disabled={loading}>
                            {loading ? "Loading..." : "Login"}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                window.location.href =
                                `${process.env.NEXT_PUBLIC_API_URL}/auth/google`
                            }
                        >
                            Continue with Google
                        </Button>

                    </form>

                </CardContent>

            </Card>

        </div>
    )
}