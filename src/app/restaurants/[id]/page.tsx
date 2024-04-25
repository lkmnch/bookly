import React from "react"
import { sql } from "@vercel/postgres"
import RestaurantPage from "@/components/RestaurantPage"
import { RestaurantType, bookingType } from "@/lib/types/restaurant"

async function Page({ params }: { params: { id: string } }) {
	const restaurantResult =
		await sql`SELECT*FROM restaurant WHERE restaurant_id = ${params.id}`

	const restaurant: RestaurantType = restaurantResult
		.rows[0] as unknown as RestaurantType

	const bookingResult =
		await sql`SELECT*FROM booking WHERE fk_restaurant_id = ${params.id}`
	const bookings: bookingType[] = bookingResult.rows as unknown as bookingType[]
	console.log(bookings)
	return <RestaurantPage restaurant={restaurant} bookings={bookings} />
}

export default Page
