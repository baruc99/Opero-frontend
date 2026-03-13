"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { apiRequest } from "@/lib/api"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CreateServiceForm({ onCreated }: any) {

    const params = useParams()
    const businessId = params.id

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [duration, setDuration] = useState("")
    const [price, setPrice] = useState("")

    async function handleSubmit(e: any) {

        e.preventDefault()

        const token = localStorage.getItem("token")

        const response = await apiRequest("/services", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                description,
                duration: Number(duration),
                price: Number(price),
                business_id: businessId
            })
        })

        console.log(response)

        setName("")
        setDescription("")
        setDuration("")
        setPrice("")

        onCreated()
    }

    return (

        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
        >

            <Input
                placeholder="Service name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <Input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <Input
                type="number"
                placeholder="Duration (minutes)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
            />

            <Input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <Button>
                Add Service
            </Button>

        </form>
    )
}