"use client"
import React, { useContext, useEffect, useState } from "react"
import { Button } from "./ui/button"
import { AppContext } from "../app/context/AppProvider"
import {
	RestaurantContextType,
	RestaurantType,
	bookingType,
} from "@/lib/types/restaurant"
import DatePicker from "./DatePicker"
import TimePicker from "./TimePicker"
import RestaurantMenu from "./RestaurantMenu"
import { useRouter } from "next/navigation"
import Image from "next/image"

type RestaurantPageProps = {
	restaurant: RestaurantType
	bookings: bookingType[]
}

function RestaurantPage({ restaurant, bookings }: RestaurantPageProps) {
	const { dateTime } = useContext(AppContext) as RestaurantContextType

	const router = useRouter()

	useEffect(() => {
		console.log(restaurant.name)
	}, [])

	const checkAvailabilty = () => {
		console.log(bookings?.filter((booking) => dateTime !== booking.date_time))
		if (bookings) {
			bookings?.filter((booking) => dateTime !== booking.date_time)
				? console.log("Timeslot available")
				: console.log("Timeslot not available")
		} else {
			console.log("Timeslot available")
			router.push(`/restaurants/${restaurant.restaurant_id}/seatingplan`)
		}
	}
	return (
		restaurant && (
			<div className=' flex flex-col gap-8'>
				<div className=' flex gap-4'>
					<div>
						{restaurant.thumbnail_url ? (
							<Image
								id='CardImage'
								width={400}
								height={200}
								alt='restaurantImage'
								priority={true}
								className='w-full aspect-video rounded-lg'
								src={restaurant.thumbnail_url}
							/>
						) : (
							<Image
								id='CardImage'
								width={400}
								height={200}
								alt='restaurantImage'
								priority={true}
								className='w-full'
								src={`/placeholder-image.png`}
							/>
						)}
					</div>
					<div className='flex flex-col justify-between'>
						<h1 className='text-2xl font-bold mb-4'>{restaurant.name}</h1>

						<div className='mb-4'>{restaurant.description}</div>
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
