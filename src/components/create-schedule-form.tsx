"use client"

import { useState } from "react"
import { apiRequest } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const dayMap: any = {
    lunes: "monday",
    martes: "tuesday",
    miercoles: "wednesday",
    jueves: "thursday",
    viernes: "friday",
    sabado: "saturday",
    domingo: "sunday"
}

export default function CreateScheduleForm({ staffId }: any) {

    console.log(staffId);


    const [day, setDay] = useState("lunes")
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [breakStart, setBreakStart] = useState("")
    const [breakEnd, setBreakEnd] = useState("")

    async function handleSubmit(e: any) {

        e.preventDefault()

        const token = localStorage.getItem("token")

        await apiRequest(`/staff/${staffId}/schedule`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                day: dayMap[day],
                start,
                end,
                break_start: breakStart || undefined,
                break_end: breakEnd || undefined
            })
        })




        setStart("")
        setEnd("")
        setBreakStart("")
        setBreakEnd("")
    }

    return (

        <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-3 items-end">

            <div>
                <label className="text-sm text-gray-500">
                    Día
                </label>
                <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="border p-2 rounded w-full"
                >
                    <option value="lunes">Lunes</option>
                    <option value="martes">Martes</option>
                    <option value="miercoles">Miércoles</option>
                    <option value="jueves">Jueves</option>
                    <option value="viernes">Viernes</option>
                    <option value="sabado">Sábado</option>
                    <option value="domingo">Domingo</option>
                </select>
            </div>

            <div>
                <label className="text-sm text-gray-500">
                    Inicio jornada
                </label>
                <Input
                    type="time"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                />
            </div>

            <div>
                <label className="text-sm text-gray-500">
                    Fin jornada
                </label>
                <Input
                    type="time"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                />
            </div>

            <div>
                <label className="text-sm text-gray-500">
                    Inicio comida
                </label>
                <Input
                    type="time"
                    value={breakStart}
                    onChange={(e) => setBreakStart(e.target.value)}
                />
            </div>

            <div>
                <label className="text-sm text-gray-500">
                    Fin comida
                </label>
                <Input
                    type="time"
                    value={breakEnd}
                    onChange={(e) => setBreakEnd(e.target.value)}
                />
            </div>

            <Button type="submit">
                Guardar
            </Button>

        </form>

    )
}