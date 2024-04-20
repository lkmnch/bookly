import { Booking, columns } from "./columns"
import { DataTable } from "./data-table"
import React from "react"
interface Restaurant {
	restaurantDescription: string
	restaurantName: string
	seatingPlan: { activeSeat: { id: number; label: string }; overId: number }[]
	bookings?: {
		dateTime: string
		bookedSeats: { activeSeat: { id: number; label: string }; overId: number }[]
		firstName: string
		lastName: string
		email: string
		phoneNumber: string
		specialRequirements: string
	}[]
}
async function getData(): Promise<Booking[]> {
	// Fetch data from your API here.

	const data = localStorage.getItem("restaurants")
	if (data) {
		const jsonData = JSON.parse(data)
		const allBookings = Object.values(jsonData)
			.flatMap((restaurant: Restaurant) => restaurant.bookings || [])
			.filter((booking) => booking !== undefined)

		console.log(allBookings)
	}
}

export default async function Page() {
	const data = await getData()

	return (
		<div className='container mx-auto py-10'>
			<DataTable columns={columns} data={data} />
		</div>
	)
}
