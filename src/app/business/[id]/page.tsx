"use client"

import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function BusinessPage() {

    const router = useRouter()
    const params = useParams()
    const businessId = params.id

    return (

        <div className="p-10 max-w-3xl mx-auto">

            <h1 className="text-2xl font-bold mb-6">
                Business Settings
            </h1>

            <div className="flex gap-4 flex-wrap">

                <Button
                    onClick={() =>
                        router.push(`/business/${businessId}/services`)
                    }
                >
                    Services
                </Button>

                <Button
                    onClick={() =>
                        router.push(`/business/${businessId}/staff`)
                    }
                >
                    Staff
                </Button>

                <Button
                    onClick={() =>
                        router.push(`/business/${businessId}/staff-services`)
                    }
                >
                    Assign Services
                </Button>

                <Button
                    onClick={() =>
                        router.push(`/business/${businessId}/schedule`)
                    }
                >
                    Schedule
                </Button>

            </div>

        </div>

    )

}