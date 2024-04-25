"use client"
import Restaurant from "./Restaurant"
import { RestaurantType } from "@/lib/types/restaurant"

function RestaurantList({ restaurants }: { restaurants: RestaurantType[] }) {
	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-4xl font-bold'>Restaurants</h1>
			{restaurants
				? restaurants.map((restaurant) => (
						<Restaurant
							key={restaurant.restaurant_id}
							restaurant_id={restaurant.restaurant_id}
							name={restaurant.name}
							description={restaurant.description}
							thumbnail_url={restaurant.thumbnail_url}
						/>
				  ))
				: "Aktuell gibt es keine Restaurants, komm später vorbei!"}
		</div>
	)
}

export default RestaurantList
