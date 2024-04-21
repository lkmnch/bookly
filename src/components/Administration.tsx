"use client"
import { Button } from "./ui/button"
import SeatingPlan from "./SeatingPlan"
import Link from "next/link"
import { useEffect, useState } from "react"
import { restaurantDataType } from "@/lib/types/restaurant"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import Image from "next/image"
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
							<Button
								variant={"outline"}
								className='w-60 h-60 text-2xl flex flex-col justify-start '>
								{restaurant[1].restaurantThumbnail ? (
									<Image
										src={restaurant[1].restaurantThumbnail}
										alt='thumbnail'
										className='w-36 rounded-md'
									/>
								) : (
									<Image src='/placeholder-image.png' alt='thumbnail' />
								)}
								<div className='text-wrap'>{restaurant[1].restaurantName}</div>
							</Button>
						</Link>
					))}
			</div>
			<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
				Buchungen
			</h1>
			{restaurants &&
			Object.values(restaurants).some((restaurant) => {
				return restaurant.bookings
			}) ? (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Restaurant</TableHead>
							<TableHead>Datum</TableHead>
							<TableHead>Reservierte Stühle</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>E-Mail</TableHead>
							<TableHead>Telefon</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{restaurants &&
							Object.entries(restaurants).map((restaurant) =>
								restaurant[1].bookings?.map((booking, index) => (
									<TableRow key={index}>
										<TableCell>{restaurant[1].restaurantName}</TableCell>
										<TableCell>{booking.dateTime.toString()}</TableCell>
										<TableCell>
											{booking.bookedSeats.map((seat, index) => (
												<div key={index}>{seat.activeSeat.label}</div>
											))}
										</TableCell>
										<TableCell>
											{booking.firstName + " " + booking.lastName}
										</TableCell>
										<TableCell>{booking.email}</TableCell>
										<TableCell>{booking.phoneNumber}</TableCell>
									</TableRow>
								))
							)}
					</TableBody>
				</Table>
			) : (
				<div className='flex justify-center align-middle'>Keine Buchungen</div>
			)}
		</>
	)
}

export default Administration
