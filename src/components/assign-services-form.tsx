"use client"

import { useEffect, useState } from "react"
import { apiRequest } from "@/lib/api"
import { Checkbox } from "@/components/ui/checkbox"

export default function AssignServicesForm({ staffId }: any) {

    const [services, setServices] = useState<any[]>([])
    const [assigned, setAssigned] = useState<string[]>([])

    async function loadServices() {

        const res = await apiRequest("/services")

        setServices(res.data || [])

    }

    async function loadAssigned() {

        const res = await apiRequest(`/staff/${staffId}/services`)

        setAssigned(res.data.map((s: any) => s.service_id))

    }

    async function assign(serviceId: string) {

        await apiRequest(`/staff/${staffId}/services`, {
            method: "POST",
            body: JSON.stringify({
                service_id: serviceId
            })
        })

        setAssigned(prev => [...prev, serviceId])

    }

    useEffect(() => {

        loadServices()
        loadAssigned()

    }, [])

    return (

        <div className="flex flex-wrap gap-3">

            {services.map((s: any) => (

                <label
                    key={s.id}
                    className="flex items-center gap-2 border px-3 py-1 rounded"
                >

                    <Checkbox
                        checked={assigned.includes(s.id)}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                assign(s.id)
                            }
                        }}
                    />

                    {s.name}

                </label>

            ))}

        </div>

    )

}