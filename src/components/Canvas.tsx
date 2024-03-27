import React from "react"
import CanvasTile from "./CanvasTile"
import { activeSeatType } from "@/lib/types/restaurant"

interface CanvasProps {
	activeSeats?: activeSeatType[]
	setSelectedSeats?: React.Dispatch<React.SetStateAction<number>>
}

const Canvas: React.FC<CanvasProps> = ({ activeSeats, setSelectedSeats }) => {
	return (
		<div className='bg-gray-100 rounded h-[1000px] w-[1000px] grid grid-cols-25 grid-rows-25 '>
			{[...Array(625)].map((_, index) => (
				<CanvasTile
					key={index}
					id={index}
					activeSeats={activeSeats}
					setSelectedSeats={setSelectedSeats}
				/>
			))}
		</div>
	)
}

export default Canvas
