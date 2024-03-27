"use client"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card"

import Rating from "./Rating"
import Link from "next/link"
import { IRestaurant, RestaurantContextType } from "../lib/types/restaurant"
import { useContext } from "react"
import { AppContext } from "../app/context/AppProvider"

function Restaurant({ id, name, description, average_rating }: IRestaurant) {
	return (
		<Card className=' hover:bg-slate-50'>
			<Link href={`/restaurants/${id}`} className='flex'>
				<div>
					<img
						id='CardImage'
						src={`/placeholder-image.png`}
						alt='Image of Restaurant'
					/>
				</div>
				<div>
					<CardHeader>
						<CardTitle>{name}</CardTitle>
						<CardDescription>{description}</CardDescription>
					</CardHeader>
					<CardContent>
						<Rating rating={average_rating} />
					</CardContent>
				</div>
			</Link>
		</Card>
	)
}

export default Restaurant
