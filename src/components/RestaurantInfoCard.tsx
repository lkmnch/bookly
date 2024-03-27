"use client"
import React, { useContext, useState } from "react"
import { Button } from "./ui/button"
import Rating from "./Rating"
import { AppContext } from "../app/context/AppProvider"
import { RestaurantContextType, bookingType } from "@/lib/types/restaurant"
import DatePicker from "./DatePicker"
import TimePicker from "./TimePicker"
import RestaurantMenu from "./RestaurantMenu"
import { useRouter } from "next/navigation"

function RestaurantInfoCard({ id }: { id: number }) {
	const { restaurants, dateTime } = useContext(
		AppContext
	) as RestaurantContextType
	const [bookings, setBookings] = useState<bookingType[]>()
	const router = useRouter()
	const checkAvailabilty = () => {
		console.log(bookings?.filter((booking) => dateTime !== booking.dateTime))
		if (bookings) {
			bookings?.filter((booking) => dateTime !== booking.dateTime)
				? console.log("Timeslot available")
				: console.log("Timeslot not available")
		} else {
			console.log("Timeslot available")
			router.push(`/restaurants/${id}/seatingplan`)
		}
	}
	return (
		<div className='flex flex-col gap-4'>
			<div>
				<img id='CardImage' src='/placeholder-image.png' />
			</div>
			<h1 className='text-2xl'>{restaurants[id].name}</h1>
			<Rating rating={restaurants[id].average_rating} />
			{restaurants[id].description}
			<div className='flex gap-4'>
				<DatePicker />
				<TimePicker />
				<Button onClick={checkAvailabilty}>
					<span>Buchen</span>
				</Button>
			</div>
			<RestaurantMenu />
		</div>
	)
}

export default RestaurantInfoCard
