import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { UniqueIdentifier, useDraggable, useDroppable } from "@dnd-kit/core"

import CanvasTile from "./CanvasTile"
import { SeatType } from "@/@types/restaurant"

interface CanvasProps {
	activeSeat: SeatType | undefined
	overId: UniqueIdentifier
}

const Canvas: React.FC<CanvasProps> = ({ activeSeat, overId }) => {
	return (
		<div className='bg-gray-100 rounded h-[1000px] w-[1000px] grid grid-cols-25 grid-rows-25 '>
			{[...Array(625)].map((_, index) => (
				<CanvasTile
					key={index}
					id={index}
					activeSeat={activeSeat}
					overId={overId}
				/>
			))}
		</div>
	)
}

export default Canvas
