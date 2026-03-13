"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { apiRequest } from "@/lib/api"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CreateStaffForm({ onCreated }: any) {

    const params = useParams()
    const businessId = params.id

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    async function handleSubmit(e: any) {

        e.preventDefault()

        const token = localStorage.getItem("token")

        await apiRequest("/staff", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                business_id: businessId
            })
        })

        setName("")
        setEmail("")

        onCreated()
    }

    return (

        <form
            onSubmit={handleSubmit}
            className="flex gap-2 mb-6"
        >

            <Input
                placeholder="Staff name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <Input
                placeholder="Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <Button>
                Add Staff
            </Button>

        </form>

    )
}