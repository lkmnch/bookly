"use client"
import React, { useContext } from "react"
import { Button } from "./ui/button"
import Rating from "./Rating"
import { AppContext } from "../app/context/AppProvider"
import { RestaurantContextType } from "@/lib/types/restaurant"
import DatePicker from "./DatePicker"
import imgUrl from "../assets/placeholder-image.png"
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover"
import { cn } from "@/lib/utils"
import { ClockIcon } from "@radix-ui/react-icons"
import { Input } from "./ui/input"
import TimePicker from "./TimePicker"
import RestaurantMenu from "./RestaurantMenu"

function RestaurantInfoCard() {
	const { restaurants, currentId } = useContext(
		AppContext
	) as RestaurantContextType
	return (
		<div className='flex flex-col gap-4'>
			<div>
				<img id='CardImage' src='/placeholder-image.png' />
			</div>
			{/* <div className='flex mb-4'>
				* <Carousel className=' max-w-lg'>
					<CarouselContent>
						{Array.from({ length: 5 }).map((_, index) => (
							<CarouselItem key={index}>
								<div className='p-1'>
									<Card>
										<CardContent className='flex aspect-square items-center justify-center p-6'>
											<span className='text-4xl font-semibold'>
												{index + 1}
											</span>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					 <CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div> */}

			<h1 className='text-2xl'>{restaurants[currentId].name}</h1>
			<Rating rating={restaurants[currentId].average_rating} />
			{restaurants[currentId].description}
			<div className='flex gap-4'>
				<DatePicker />
				<TimePicker />
				<Button>
					<span>Buchen</span>
				</Button>
			</div>
			<RestaurantMenu />
		</div>
	)
}

export default RestaurantInfoCard
