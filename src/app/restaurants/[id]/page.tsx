import React from "react"
import RestaurantInfoCard from "@/components/RestaurantInfoCard"
function page({ params }: { params: { id: number } }) {
	return <RestaurantInfoCard id={params.id} />
}

export default page
