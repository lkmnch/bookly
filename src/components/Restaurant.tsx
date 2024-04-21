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
import Image from "next/image"

function Restaurant({
	id,
	name,
	description,
	average_rating,
	restaurantImage,
}: RestaurantType) {
	return (
		<Card className=' hover:bg-slate-50 w-full'>
			<Link href={`/restaurants/${id}`} className='flex'>
				{restaurantImage ? (
					<Image
						id='CardImage'
						src={restaurantImage}
						alt='Image of Restaurant'
						className='w-64'
					/>
				) : (
					<Image
						id='CardImage'
						src={`/placeholder-image.png`}
						alt='Image of Restaurant'
						className='w-64'
					/>
				)}

				<div>
					<CardHeader>
						<CardTitle>{name}</CardTitle>
						<CardDescription>{description}</CardDescription>
					</CardHeader>
					<CardContent>
						<Rating rating={4} />{" "}
					</CardContent>
				</div>
			</Link>
		</Card>
	)
}

export default Restaurant
