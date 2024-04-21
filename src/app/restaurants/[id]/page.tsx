import React from "react"
import RestaurantPage from "@/components/RestaurantPage"
function Page({ params }: { params: { id: string } }) {
	return <RestaurantPage id={params.id} />
}

export default Page
