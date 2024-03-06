import { useState } from "react"
import Restaurant from "./Restaurant"

function RestaurantList() {
	const [restaurantList, setRestaurantList] = useState([
		{
			id: 0,
			name: "Bella Italia",
		},
		{
			id: 1,
			name: "Steinberger Pizza Döner",
		},
		{
			id: 2,
			name: "Stadtliebe Bar & Restaurant",
		},
	])

	return (
		<>
			{restaurantList.map((restaurant) => (
				<Restaurant name={restaurant.name} />
			))}
		</>
	)
}

export default RestaurantList
