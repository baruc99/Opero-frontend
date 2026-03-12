"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { apiRequest } from "@/lib/api"

export default function CreateBusiness() {

    const [name, setName] = useState("")
    const [type, setType] = useState("")

    async function handleSubmit(e: any) {

        e.preventDefault()

        const token = localStorage.getItem("token")

        await apiRequest("/businesses", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name, type })
        })

        window.location.href = "/dashboard"
    }

    return (

        <div className="flex h-screen items-center justify-center bg-gray-50">

            <Card className="w-[380px]">

                <CardHeader>
                    <CardTitle>Create Business</CardTitle>
                </CardHeader>

                <CardContent>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >

                        <Input
                            placeholder="Business name"
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            placeholder="Type (barber, dentist...)"
                            onChange={(e) => setType(e.target.value)}
                        />

                        <Button>
                            Create
                        </Button>

                    </form>

                </CardContent>

            </Card>

        </div>
    )
}