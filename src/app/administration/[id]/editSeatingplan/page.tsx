"use client"
import SeatingPlan from "@/components/SeatingPlan"
import React from "react"

function page({ params }: { params: { id: string } }) {
	return <SeatingPlan id={params.id} />
}

export default page
