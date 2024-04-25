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
import { RestaurantType } from "../lib/types/restaurant"
import Image from "next/image"

function Restaurant({
	restaurant_id,
	name,
	description,
	thumbnail_url,
}: RestaurantType) {
	return (
		<Card className=' hover:bg-slate-50 w-full'>
			<Link href={`/restaurants/${restaurant_id}`} className='flex'>
				{thumbnail_url ? (
					<Image
						width={256}
						height={192}
						alt='Image of Restaurant'
						priority={true}
						id='CardImage'
						src={thumbnail_url}
					/>
				) : (
					<Image
						width={256}
						height={192}
						alt='Image of Restaurant'
						priority={true}
						id='CardImage'
						src={`/placeholder-image.png`}
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
