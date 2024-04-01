"use client"
import { activeSeatType } from "@/lib/types/restaurant"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useDroppable } from "@dnd-kit/core"

import Seat from "./Seat"
type CanvasTileProps = {
	navigationId: string
	id: number
	activeSeats?: activeSeatType[]
	setSelectedSeats?: React.Dispatch<React.SetStateAction<activeSeatType[]>>
}
function CanvasTile({
	navigationId,
	id,
	activeSeats,
	setSelectedSeats,
}: CanvasTileProps) {
	const { setNodeRef } = useDroppable({
		id: id,
	})
	const [activeSeatThatIsOverThisTile, setActiveSeatThatIsOverThisTile] =
		useState<activeSeatType[]>()

	const [seatingPlan, setSeatingPlan] = useState<activeSeatType[]>()

	const pathname = usePathname()

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
							overId={activeSeatThatIsOverThisTile[0]?.overId} //weg?
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
									overId={activeSeat.overId}
								/>
							)
						}
				  })}
		</div>
	)
}

export default CanvasTile
