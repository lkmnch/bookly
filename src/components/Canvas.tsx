import React from "react"
import CanvasTile from "./CanvasTile"
import { activeSeatType } from "@/lib/types/restaurant"

interface CanvasProps {
	activeSeats?: activeSeatType[]
	setSelectedSeats?: React.Dispatch<React.SetStateAction<number>>
}

const Canvas: React.FC<CanvasProps> = ({ activeSeats, setSelectedSeats }) => {
	return (
		<div
			className='bg-cover rounded h-[500px] w-[500px] md:h-[700px] md:w-[700px]  grid grid-cols-25 grid-rows-25'
			style={{ backgroundImage: `url(/floorplan2.png)` }}>
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
