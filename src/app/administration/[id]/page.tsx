import ManageRestaurant from "@/components/ManageRestaurant"
import React from "react"

function page({ params }: { params: { id: string } }) {
	return <ManageRestaurant id={params.id} />
}

export default page
