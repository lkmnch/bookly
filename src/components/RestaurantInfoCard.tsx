import React, { useContext } from "react"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"
import Rating from "./Rating"
import { AppContext } from "@/context/AppProvider"
import { RestaurantContextType } from "@/@types/restaurant"
import DatePicker from "./DatePicker"
import { Popover, PopoverTrigger } from "./ui/popover"
import { cn } from "@/lib/utils"
import { ClockIcon } from "@radix-ui/react-icons"

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
				<div className='flex justify-center mb-4'>
					<Carousel className=' max-w-lg'>
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
				</div>

				<Rating rating={restaurants[currentId].average_rating} />
			</CardContent>
			<CardFooter className='flex justify-end gap-4'>
				<DatePicker />
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={"outline"}
							className={cn("w-[240px] justify-start text-left font-normal")}>
							<ClockIcon className='mr-2 h-4 w-4' />
							{<span>Uhrzeit auswählen</span>}
						</Button>
					</PopoverTrigger>
				</Popover>
				<Button>Buchen</Button>
			</CardFooter>
		</Card>
	)
}

export default RestaurantInfoCard
