"use client"
import { Button } from "./ui/button"
import SeatingPlan from "./SeatingPlan"
import Link from "next/link"
import { Card } from "./ui/card"
import { useEffect, useState } from "react"
import { restaurantDataType } from "@/lib/types/restaurant"
import { Divide } from "lucide-react"

function Administration() {
	const [restaurants, setRestaurants] = useState<restaurantDataType>()
	useEffect(() => {
		const data = localStorage.getItem("restaurants")
		if (data) {
			const parsedData = JSON.parse(data)
			setRestaurants(parsedData)
		}
	}, [])
	return (
		<>
			<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
				Restaurants
			</h1>
			<div className='flex gap-4 flex-wrap'>
				<Link href={"/administration/createRestaurant"}>
					<Button variant={"outline"} className='w-60 h-60 text-4xl'>
						<span>+</span>
					</Button>
				</Link>

				{restaurants &&
					Object.entries(restaurants).map((restaurant) => (
						<Link key={restaurant[0]} href={`/administration/${restaurant[0]}`}>
							<Button variant={"outline"} className='w-60 h-60 text-4xl'>
								<span>{restaurant[1].restaurantName}</span>
							</Button>
						</Link>
					))}
			</div>
			<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
				Buchungen
			</h1>
		</>
	)
}

export default Administration
