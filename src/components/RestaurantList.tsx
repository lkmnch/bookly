import { useState } from "react"
import Restaurant from "./Restaurant"

function RestaurantList() {
	const [restaurantList, setRestaurantList] = useState([
		{
			id: 0,
			name: "Bella Italia",
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
