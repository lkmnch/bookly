import React from "react"

import { UniqueIdentifier } from "@dnd-kit/core"

import CanvasTile from "./CanvasTile"
import { activeSeatType } from "@/@types/restaurant"

interface CanvasProps {
	activeSeats: activeSeatType[]
}

const Canvas: React.FC<CanvasProps> = ({ activeSeats }) => {
	return (
		<div className='bg-gray-100 rounded h-[1000px] w-[1000px] grid grid-cols-25 grid-rows-25 '>
			{[...Array(625)].map((_, index) => (
				<CanvasTile key={index} id={index} activeSeats={activeSeats} />
			))}
		</div>
	)
}

export default Canvas
