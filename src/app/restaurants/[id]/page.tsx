import React from "react"
import RestaurantPage from "@/components/RestaurantPage"
function page({ params }: { params: { id: string } }) {
	return <RestaurantPage id={params.id} />
}

export default page
