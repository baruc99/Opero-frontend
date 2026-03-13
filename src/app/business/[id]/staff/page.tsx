"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { apiRequest } from "@/lib/api"

import CreateStaffForm from "@/components/create-staff-form"
import { Card, CardContent } from "@/components/ui/card"

export default function StaffPage() {

    const params = useParams()
    const businessId = params.id

    const [staff, setStaff] = useState<any[]>([])

    async function loadStaff() {

        const token = localStorage.getItem("token")

        const res = await apiRequest(
            `/staff?businessId=${businessId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        setStaff(res.data || [])
    }

    useEffect(() => {
        if (businessId) {
            loadStaff()
        }
    }, [businessId])

    return (

        <div className="p-10 max-w-3xl mx-auto">

            <h1 className="text-2xl font-bold mb-6">
                Staff
            </h1>

            <CreateStaffForm onCreated={loadStaff} />

            <div className="grid gap-4">

                {staff.map((s: any) => (
                    <Card key={s.id}>
                        <CardContent className="p-4">
                            <p className="font-semibold">{s.name}</p>
                            {s.email && (
                                <p className="text-sm text-gray-500">
                                    {s.email}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                ))}

            </div>

        </div>

    )
}