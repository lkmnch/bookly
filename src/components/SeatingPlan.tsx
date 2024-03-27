"use client"
import { useState, useContext, useEffect } from "react"
import { Active, DndContext, DragEndEvent, Over } from "@dnd-kit/core"
import Canvas from "./Canvas"
import Seat from "./Seat"
import {
	RestaurantContextType,
	SeatType,
	activeSeatType,
} from "@/lib/types/restaurant"
import RemoveSeat from "./RemoveSeat"
import { AppContext } from "@/app/context/AppProvider"
import { Button } from "./ui/button"

function SeatingPlan() {
	const { setSeatingPlan } = useContext(AppContext) as RestaurantContextType
	const [seats, setSeats] = useState<SeatType[]>([])
	const [draggedSeats, setDraggedSeats] = useState<SeatType[]>([])
	const [activeSeats, setActiveSeats] = useState<activeSeatType[]>([])
	const [nextSeatId, setNextSeatId] = useState(1)

	useEffect(() => {
		const userData = localStorage.getItem("savedSeats")
		if (userData) {
			setActiveSeats(JSON.parse(userData))
		}
	}, [])

	const addSeat = () => {
		const newSeat = { id: nextSeatId, label: `S ${nextSeatId}` }
		setSeats([...seats, newSeat])
		setNextSeatId(nextSeatId + 1)
	}
	const saveSeats = () => {
		setSeatingPlan({ activeSeats })
		localStorage.setItem("savedSeats", JSON.stringify(activeSeats))
		localStorage.setItem("seatingPlan", JSON.stringify({ activeSeats }))
	}

	const updateActiveSeats = (
		seatArray: SeatType[],
		over: Over,
		active: Active
	) => {
		if (over != null) {
			const isOverIdInActiveSeats = activeSeats.some((activeSeat) => {
				return activeSeat.overId == over.id
			})

			if (!isOverIdInActiveSeats) {
				const newActiveSeat = {
					activeSeat: seatArray.find((s) => s.id === active.id) as SeatType,
					overId: over.id as number, //if(over.id in seatArray){seatArray.overId}else{over.id}
				}
				if (newActiveSeat) {
					const isNewActiveSeatIncluded = activeSeats.some(
						(activeSeat, index) => {
							const isActiveSeatMatch =
								activeSeat.activeSeat.id === newActiveSeat.activeSeat.id &&
								activeSeat.activeSeat.label === newActiveSeat.activeSeat.label
							console.log(isActiveSeatMatch)
							if (isActiveSeatMatch) {
								activeSeats[index].overId = newActiveSeat.overId
							}

							return isActiveSeatMatch
						}
					)

					if (!isNewActiveSeatIncluded) {
						setActiveSeats([...activeSeats, newActiveSeat])
					}
				}

				setSeats(seats.filter((s) => s.id !== active.id))
			}
			if (over.id === "remove-area") {
				const filteredDraggedSeats = seatArray.filter(
					(seat) => seat.id !== active.id
				)
				setDraggedSeats(filteredDraggedSeats)
				const filteredActiveSeats = activeSeats.filter(
					(activeSeat) => activeSeat.activeSeat.id !== active.id
				)
				setActiveSeats(filteredActiveSeats)
			}
		}
	}
	const handleDragEnd = (event: DragEndEvent) => {
		console.log(event)
		const { active, over } = event
		const draggedSeat = seats.find((s) => s.id === active.id)
		console.log(draggedSeat)
		if (draggedSeat) {
			setDraggedSeats((prevDraggedSeats) => {
				const newDraggedSeats = [...prevDraggedSeats, draggedSeat]
				updateActiveSeats(newDraggedSeats, over as Over, active)
				return newDraggedSeats
			})
		} else {
			updateActiveSeats(draggedSeats, over as Over, active)
		}
	}

	return (
		<DndContext onDragEnd={handleDragEnd}>
			<div className='flex gap-2'>
				<div className='ml-4 flex gap-1 flex-wrap '>
					<Canvas activeSeats={activeSeats} />
				</div>
				<div className='flex flex-col gap-4'>
					<Button onClick={addSeat}>Sitz hinzufügen</Button>
					<RemoveSeat />
					<Button onClick={saveSeats}>Sitzplan speichern</Button>
					{seats.map((seat) => (
						<Seat key={seat.id} id={seat.id} label={seat.label} />
					))}
				</div>
			</div>
		</DndContext>
	)
}

export default SeatingPlan
