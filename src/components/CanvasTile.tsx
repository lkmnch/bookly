"use client"
import { useDroppable } from "@dnd-kit/core"

import Seat from "./Seat"
import {
	RestaurantContextType,
	activeSeatType,
	seatingPlanType,
} from "@/lib/types/restaurant"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/app/context/AppProvider"
import { usePathname } from "next/navigation"

function CanvasTile({
	id,
	activeSeats,
	setSelectedSeats,
}: {
	id: number
	activeSeats?: activeSeatType[]
	setSelectedSeats?: React.Dispatch<React.SetStateAction<number>>
}) {
	const { setNodeRef } = useDroppable({
		id: id,
	})
	const [activeSeatThatIsOverThisTile, setActiveSeatThatIsOverThisTile] =
		useState<activeSeatType[]>()

	//const { seatingPlan } = useContext(AppContext) as RestaurantContextType
	const [seatingPlan, setSeatingPlan] = useState<seatingPlanType>()
	useEffect(() => {
		const data = localStorage.getItem("seatingPlan")
		if (data) {
			setSeatingPlan(JSON.parse(data))
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
			{pathname == "/administration/seatingplan"
				? activeSeatThatIsOverThisTile &&
				  activeSeatThatIsOverThisTile.length == 1 && (
						<Seat
							key={activeSeatThatIsOverThisTile[0]?.activeSeat.id}
							id={activeSeatThatIsOverThisTile[0]?.activeSeat.id}
							label={activeSeatThatIsOverThisTile[0]?.activeSeat.label}
						/>
				  )
				: seatingPlan?.activeSeats.map((activeSeat) => {
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
