import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useDraggable, useDroppable } from "@dnd-kit/core"
import Seat from "./Seat"

interface CanvasProps {
	seats: {
		id: string
		label: string
	}[]
}

const Canvas: React.FC<CanvasProps> = ({ seats }) => {
	const { setNodeRef } = useDroppable({
		id: "canvas",
	})

	return (
		<div
			ref={setNodeRef}
			className='bg-gray-100 p-4 rounded min-h-[400px] min-w-[400px]'>
			{seats.map((seat) => (
				<Seat key={seat.id} id={seat.id} label={seat.label} />
			))}
		</div>
	)
}

export default Canvas
