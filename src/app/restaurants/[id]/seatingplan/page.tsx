"use client"
import { AppContext } from "@/app/context/AppProvider"
import Canvas from "@/components/Canvas"
import { Button } from "@/components/ui/button"
import { RestaurantContextType } from "@/lib/types/restaurant"
import React, { useContext, useState } from "react"

function page() {
	const [selectedSeats, setSelectedSeats] = useState(0)
	const { dateTime } = useContext(AppContext) as RestaurantContextType
	return (
		<div>
			<div>
				<span>{`Anzahl ausgewählter Sitzplätze: ${selectedSeats}`}</span>
			</div>
			<div>
				<span>{`Datum: ${dateTime}`}</span>
			</div>
			<Canvas setSelectedSeats={setSelectedSeats} />
			<Button>Buchen</Button>
		</div>
	)
}

export default page
