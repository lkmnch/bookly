"use client"
import React, { useContext, useEffect, useState } from "react"
import { Button } from "./ui/button"
import Rating from "./Rating"
import { AppContext } from "../app/context/AppProvider"
import {
	RestaurantContextType,
	bookingType,
	restaurantDataType,
} from "@/lib/types/restaurant"
import DatePicker from "./DatePicker"
import TimePicker from "./TimePicker"
import RestaurantMenu from "./RestaurantMenu"
import { useRouter } from "next/navigation"

type restaurantData = {
	restaurantName: string
	restaurantDescription: string
}
function RestaurantPage({ id }: { id: string }) {
	const { dateTime } = useContext(AppContext) as RestaurantContextType
	const [bookings, setBookings] = useState<bookingType[]>()
	const [restaurant, setRestaurant] = useState<restaurantData>()

	const router = useRouter()

	useEffect(() => {
		const data = localStorage.getItem("restaurants")
		if (data) {
			const parsedData = JSON.parse(data)
			const restaurant = parsedData[id]
			setRestaurant(restaurant)
		}
	}, [])

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
			<h1 className='text-2xl'>{restaurant?.restaurantName}</h1>
			{/* <Rating rating={restaurants[id].average_rating} /> */}
			{restaurant?.restaurantDescription}
			<div className='flex gap-4'>
				<DatePicker />
				<TimePicker />
				<Button onClick={checkAvailabilty}>
					<span>Verfügbarkeit prüfen</span>
				</Button>
			</div>
			<RestaurantMenu />
		</div>
	)
}

export default RestaurantPage
