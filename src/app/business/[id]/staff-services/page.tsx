"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { apiRequest } from "@/lib/api"

import AssignServicesForm from "@/components/assign-services-form"
import { Card, CardContent } from "@/components/ui/card"

export default function StaffServicesPage() {

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

        console.log( res );
        

        setStaff(res.data || [])

    }

    useEffect(() => {
        if (businessId) {
            loadStaff()
        }
    }, [businessId])

    return (

        <div className="p-10 max-w-4xl mx-auto">

            <h1 className="text-2xl font-bold mb-6">
                Assign Services
            </h1>

            <div className="grid gap-4">

                {staff.map((s: any) => (

                    <Card key={s.id}>
                        <CardContent className="p-4">

                            <p className="font-semibold mb-3">
                                {s.name}
                            </p>

                            <AssignServicesForm
                                staffId={s.id}
                            />

                        </CardContent>
                    </Card>

                ))}

            </div>

        </div>

    )
}