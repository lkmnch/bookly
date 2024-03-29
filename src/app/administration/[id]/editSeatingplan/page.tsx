import SeatingPlan from "@/components/SeatingPlan"
import React from "react"

function page({ params }: { params: { id: string } }) {
	console.log("🚀 ~ page ~ params:", params)

	return <SeatingPlan id={params.id} />
}

export default page
