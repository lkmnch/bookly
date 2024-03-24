"use client"
import { useContext } from "react"
import Restaurant from "./Restaurant"
import { AppContext } from "../app/context/AppProvider"
import { RestaurantContextType } from "../lib/types/restaurant"

function RestaurantList() {
	const { restaurants } = useContext(AppContext) as RestaurantContextType

	return (
		<div className='flex flex-col gap-4'>
			{restaurants.map((restaurant) => (
				<Restaurant
					key={restaurant.id}
					id={restaurant.id}
					name={restaurant.name}
					description={restaurant.description}
					average_rating={restaurant.average_rating}
				/>
			))}
		</div>
	)
}

export default RestaurantList
