"use client"
import { activeSeatType } from "@/lib/types/restaurant"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useDroppable } from "@dnd-kit/core"

import Seat from "./Seat"

function CanvasTile({
	navigationId,
	id,
	activeSeats,
	setSelectedSeats,
}: {
	navigationId: string
	id: number
	activeSeats?: activeSeatType[]
	setSelectedSeats?: React.Dispatch<React.SetStateAction<number>>
}) {
	const { setNodeRef } = useDroppable({
		id: id,
	})
	const [activeSeatThatIsOverThisTile, setActiveSeatThatIsOverThisTile] =
		useState<activeSeatType[]>()

	const [seatingPlan, setSeatingPlan] = useState<activeSeatType[]>()
	useEffect(() => {
		const data = localStorage.getItem("restaurants")

		if (data) {
			const parsedData = JSON.parse(data)
			if (parsedData[navigationId]) {
				const restaurant = parsedData[navigationId]
				if (restaurant.seatingPlan) {
					setSeatingPlan(restaurant.seatingPlan)
				}
			}
		}
	}, [])

	const pathname = usePathname()
	useEffect(() => {
		if (activeSeats) {
			setActiveSeatThatIsOverThisTile(
				activeSeats.filter((activeSeat) => activeSeat.overId == id)
			)
		}
	}, [JSON.stringify(activeSeats)])

	return (
		<div ref={setNodeRef} className='bg-none border-0 border-gray-400'>
			{pathname == `/administration/${navigationId}/editSeatingplan`
				? activeSeatThatIsOverThisTile &&
				  activeSeatThatIsOverThisTile.length == 1 && (
						<Seat
							key={activeSeatThatIsOverThisTile[0]?.activeSeat.id}
							id={activeSeatThatIsOverThisTile[0]?.activeSeat.id}
							label={activeSeatThatIsOverThisTile[0]?.activeSeat.label}
						/>
				  )
				: seatingPlan?.map((activeSeat) => {
						if (activeSeat.overId === id) {
							return (
								<Seat
									key={activeSeat.activeSeat.id}
									id={activeSeat.activeSeat.id}
									label={activeSeat.activeSeat.label}
									setSelectedSeats={setSelectedSeats}
								/>
							)
						}
				  })}
		</div>
	)
}

export default CanvasTile
