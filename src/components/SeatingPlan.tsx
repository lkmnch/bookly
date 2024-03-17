import { useEffect, useState } from "react"
import {
	DndContext,
	DragEndEvent,
	DragStartEvent,
	UniqueIdentifier,
} from "@dnd-kit/core"
import Canvas from "./Canvas"
import Seat from "./Seat"
import { SeatType } from "@/@types/restaurant"

function SeatingPlan() {
	const [seats, setSeats] = useState<SeatType[]>([])
	const [draggedSeats, setDraggedSeats] = useState<SeatType[]>([])
	const [activeSeat, setActiveSeat] = useState<SeatType>()
	const [overId, setOverId] = useState<UniqueIdentifier>(0)
	const [nextSeatId, setNextSeatId] = useState(1)

	const addSeat = () => {
		const newSeat = { id: nextSeatId, label: `Seat ${nextSeatId}` }
		setSeats([...seats, newSeat])
		setNextSeatId(nextSeatId + 1)
	}

	/* 	const handleDragStart = (event: DragStartEvent) => {
		console.log("drag start event", event)

		const { active } = event

		if (active) {
			setSeats(seats.filter((s) => s.id !== active.id))
		}
	} */
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		console.log(event)
		const draggedSeat = seats.find((s) => s.id === active.id)
		console.log(draggedSeat)
		draggedSeat &&
			setDraggedSeats((prevDraggedSeats) => {
				const newDraggedSeats = [...prevDraggedSeats, draggedSeat]
				if (over && newDraggedSeats.length !== 0) {
					setActiveSeat(newDraggedSeats.find((s) => s.id === active.id))
					setOverId(over.id)
					setSeats(seats.filter((s) => s.id !== active.id))
				}
				return newDraggedSeats
			})
		if (over && draggedSeats.length !== 0) {
			setActiveSeat(draggedSeats.find((s) => s.id === active.id))
			setOverId(over.id)
			setSeats(seats.filter((s) => s.id !== active.id))
		}

		// if (activeSeat) {
		// 	// setActiveSeat(activeSeat)
		//
		// 	// weitere Variable Trennen von filtern und gefundenen seats
		// }
	}

	return (
		<DndContext onDragEnd={handleDragEnd}>
			<div className='flex'>
				<div>
					<button
						className='bg-blue-500 text-white px-4 py-2 rounded mb-4'
						onClick={addSeat}>
						Add Seat
					</button>
					{seats.map((seat) => (
						<Seat key={seat.id} id={seat.id} label={seat.label} />
					))}
				</div>
				<div className='ml-4 flex gap-1 flex-wrap '>
					<Canvas activeSeat={activeSeat} overId={overId} />
				</div>
			</div>
		</DndContext>
	)
}

export default SeatingPlan
