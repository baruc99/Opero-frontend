"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { apiRequest } from "@/lib/api"

import { Card, CardContent } from "@/components/ui/card"
import CreateServiceForm from "@/components/create-service-form"

export default function ServicesPage() {

    const params = useParams()
    const businessId = params.id

    const [services, setServices] = useState<any[]>([])

    async function loadServices() {

        const token = localStorage.getItem("token")

        const res = await apiRequest(
            `/services?businessId=${businessId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        setServices(res.data || [])
    }

    useEffect(() => {
        if (businessId) {
            loadServices()
        }
    }, [businessId])

    return (

        <div className="p-10 max-w-3xl mx-auto">

            <h1 className="text-2xl font-bold mb-6">
                Services
            </h1>

            <CreateServiceForm
                onCreated={loadServices}
            />

            <div className="mt-6 grid gap-4">

                {services.map((s: any) => (
                    <Card key={s.id}>
                        <CardContent className="p-4">

                            <div className="flex justify-between">

                                <div>
                                    <p className="font-semibold">
                                        {s.name}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {s.duration} min
                                    </p>
                                </div>

                                <p>
                                    ${s.price}
                                </p>

                            </div>

                        </CardContent>
                    </Card>
                ))}

            </div>

        </div>
    )
}