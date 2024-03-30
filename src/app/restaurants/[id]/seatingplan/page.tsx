"use client"
import { AppContext } from "@/app/context/AppProvider"
import Canvas from "@/components/Canvas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RestaurantContextType } from "@/lib/types/restaurant"
import React, { useContext, useState } from "react"

function page({ params }: { params: { id: string } }) {
	const [selectedSeats, setSelectedSeats] = useState(0)
	const { dateTime } = useContext(AppContext) as RestaurantContextType
	return (
		<div className='flex flex-wrap gap-2 md:flex-nowrap'>
			<Canvas setSelectedSeats={setSelectedSeats} id={params.id} />
			<div className='flex flex-col gap-3'>
				<div>
					<span className='leading-7 [&:not(:first-child)]:mt-6'>{`Anzahl ausgewählter Sitzplätze: ${selectedSeats}`}</span>
				</div>
				<div>
					<span className='leading-7 [&:not(:first-child)]:mt-6'>{`Datum: ${dateTime}`}</span>
				</div>
				<Input placeholder='Telefonnummer' />
				<Input placeholder='Name' />
				<Button>Buchen</Button>
			</div>
		</div>
	)
}

export default page
