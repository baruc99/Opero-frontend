"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { apiRequest } from "@/lib/api"

export default function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e: any) {

        e.preventDefault()

        await apiRequest("/auth/register", {
            method: "POST",
            body: JSON.stringify({ name, email, password })
        })

        window.location.href = "/login"
    }

    return (

        <div className="flex h-screen items-center justify-center bg-gray-50">

            <Card className="w-95">

                <CardHeader>
                    <CardTitle>Register</CardTitle>
                </CardHeader>

                <CardContent>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >

                        <Input
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button>
                            Register
                        </Button>

                    </form>

                </CardContent>

            </Card>

        </div>
    )
}