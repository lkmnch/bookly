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
import Image from "next/image"

type restaurantData = {
	restaurantName: string
	restaurantDescription: string
	restaurantImage: string
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
			console.log(restaurant)
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
		restaurant && (
			<div className=' flex flex-col gap-8'>
				<div className=' flex gap-4'>
					<div>
						{restaurant.restaurantImage ? (
							<Image
								id='CardImage'
								alt='restaurantImage'
								className='w-full aspect-video rounded-lg'
								src={restaurant.restaurantImage}
							/>
						) : (
							<Image
								id='CardImage'
								alt='restaurantImage'
								className='w-full'
								src={`/placeholder-image.png`}
							/>
						)}
					</div>
					<div className='flex flex-col justify-between'>
						<h1 className='text-2xl font-bold mb-4'>
							{restaurant.restaurantName}
						</h1>

						<div className='mb-4'>{restaurant.restaurantDescription}</div>
						<div className='flex flex-wrap gap-4'>
							<DatePicker />
							<TimePicker />
							<Button onClick={checkAvailabilty}>
								<span>Verfügbarkeit prüfen</span>
							</Button>
						</div>
					</div>
				</div>

				<RestaurantMenu />
			</div>
		)
	)
}

export default RestaurantPage
