import React, { useState } from "react"
import { DndContext } from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import Canvas from "./Canvas"
import Seat from "./Seat"

const initialSeats: { id: string; label: string }[] = []

function SeatingPlan() {
	const [seats, setSeats] = useState(initialSeats)
	const [canvas, setCanvas] = useState<{ id: string; label: string }[]>([])
	const [nextSeatId, setNextSeatId] = useState(1)

	const handleDragEnd = (event: any) => {
		const { active, over } = event

		if (over?.id === "canvas") {
			const activeSeat = seats.find((s) => s.id === active.id)
			if (activeSeat) {
				const newCanvas = [...canvas, activeSeat]
				setCanvas(newCanvas)
				setSeats(seats.filter((s) => s.id !== active.id))
			}
		}
	}
	const addSeat = () => {
		const newSeat = { id: `seat${nextSeatId}`, label: `Seat ${nextSeatId}` }
		setSeats([...seats, newSeat])
		setNextSeatId(nextSeatId + 1)
	}

	return (
		<DndContext onDragEnd={handleDragEnd}>
			<SortableContext items={canvas}>
				<div className='flex'>
					<div>
						<h2>Seats</h2>
						<button
							className='bg-blue-500 text-white px-4 py-2 rounded mb-4'
							onClick={addSeat}>
							Add Seat
						</button>
						{seats.map((seat) => (
							<Seat key={seat.id} id={seat.id} label={seat.label} />
						))}
					</div>
					<div className='ml-4'>
						<h2>Canvas</h2>
						<Canvas seats={canvas} />
					</div>
				</div>
			</SortableContext>
		</DndContext>
	)
}

export default SeatingPlan
