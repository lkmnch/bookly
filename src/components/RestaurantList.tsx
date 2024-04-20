"use client"
import { useContext, useEffect, useState } from "react"
import Restaurant from "./Restaurant"
import { AppContext } from "../app/context/AppProvider"
import { RestaurantContextType } from "../lib/types/restaurant"
import { restaurantDataType } from "@/lib/types/restaurant"

function RestaurantList() {
	const [restaurants, setRestaurants] = useState<restaurantDataType>()
	useEffect(() => {
		const data = localStorage.getItem("restaurants")
		if (data) {
			const parsedData = JSON.parse(data)
			setRestaurants(parsedData)
		}
	}, [])

	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-4xl font-bold'>Restaurants</h1>
			{restaurants &&
				Object.entries(restaurants).map((restaurant) => (
					<Restaurant
						key={restaurant[0]}
						id={restaurant[0]}
						name={restaurant[1].restaurantName}
						description={restaurant[1].restaurantDescription}
						restaurantImage={restaurant[1].restaurantThumbnail}
						// average_rating={restaurant.average_rating}
					/>
				))}
		</div>
	)
}

export default RestaurantList
