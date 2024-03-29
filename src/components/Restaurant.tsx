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
import { RestaurantType, RestaurantContextType } from "../lib/types/restaurant"

function Restaurant({ id, name, description, average_rating }: RestaurantType) {
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
					<CardContent>{/* <Rating rating={average_rating} /> */}</CardContent>
				</div>
			</Link>
		</Card>
	)
}

export default Restaurant
