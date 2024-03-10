import React, { useContext } from "react"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card"
import Rating from "./Rating"
import { AppContext } from "@/context/AppProvider"
import { RestaurantContextType } from "@/@types/restaurant"

function RestaurantInfoCard() {
	const { restaurants, currentId } = useContext(
		AppContext
	) as RestaurantContextType
	return (
		<Card>
			<CardHeader>
				<CardTitle>{restaurants[currentId].name}</CardTitle>
				<CardDescription>{restaurants[currentId].description}</CardDescription>
			</CardHeader>
			<CardContent>
				<Rating rating={restaurants[currentId].average_rating} />
			</CardContent>
		</Card>
	)
}

export default RestaurantInfoCard
