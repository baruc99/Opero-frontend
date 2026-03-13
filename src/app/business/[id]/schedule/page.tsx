"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { apiRequest } from "@/lib/api"

import CreateScheduleForm from "@/components/create-schedule-form"
import { Card, CardContent } from "@/components/ui/card"

export default function SchedulePage() {

    const params = useParams()
    const businessId = params.id

    const [staff, setStaff] = useState<any[]>([])
    const [schedules, setSchedules] = useState<any>({})

    async function loadStaff() {

        const res = await apiRequest(`/staff?businessId=${businessId}`)

        const staffList = res.data || []

        setStaff(staffList)

        // cargar horarios de cada staff
        staffList.forEach((s: any) => {
            loadSchedules(s.id)
        })

    }

    async function loadSchedules(staffId: string) {

        const res = await apiRequest(`/staff/${staffId}/schedule`)

        setSchedules((prev: any) => ({
            ...prev,
            [staffId]: res.data || []
        }))

    }

    useEffect(() => {
        if (businessId) {
            loadStaff()
        }
    }, [businessId])

    return (

        <div className="p-10 max-w-4xl mx-auto">

            <h1 className="text-2xl font-bold mb-6">
                Staff Schedule
            </h1>

            <div className="grid gap-4">

                {staff.map((s: any) => (

                    <Card key={s.id}>
                        <CardContent className="p-4">

                            <p className="font-semibold mb-3">
                                {s.name}
                            </p>

                            <CreateScheduleForm staffId={s.id} />

                            {/* Mostrar horarios */}
                            <div className="mt-4 space-y-2 text-sm">

                                {(schedules[s.id] || []).map((sch: any) => (

                                    <div
                                        key={sch.id}
                                        className="flex justify-between border p-2 rounded"
                                    >

                                        <span>{sch.day}</span>

                                        <span>
                                            {sch.start} - {sch.end}
                                        </span>

                                        {sch.break_start && (
                                            <span className="text-gray-500">
                                                comida {sch.break_start} - {sch.break_end}
                                            </span>
                                        )}

                                    </div>

                                ))}

                            </div>

                        </CardContent>
                    </Card>

                ))}

            </div>

        </div>

    )
}