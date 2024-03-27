import { useDraggable } from "@dnd-kit/core"
import { SeatType } from "@/lib/types/restaurant"
import { useState } from "react"

type SeatProps = {
	id: number
	label: string
	setSelectedSeats?: React.Dispatch<React.SetStateAction<number>>
}

const Seat = ({ id, label, setSelectedSeats }: SeatProps) => {
	const [isSelected, setIsSelected] = useState(false)
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id,
	})

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: undefined

	const handleClick = () => {
		if (isSelected) {
			setIsSelected(false)
			setSelectedSeats?.((prevSelectedSeats) => prevSelectedSeats - 1)
		} else {
			setIsSelected(true)
			setSelectedSeats?.((prevSelectedSeats) => prevSelectedSeats + 1)
		}
	}

	return (
		<div
			onClick={handleClick}
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className={
				!isSelected
					? "bg-orange-300  rounded cursor-move h-10 w-10"
					: "bg-orange-700  rounded cursor-move h-10 w-10"
			}>
			{label}
		</div>
	)
}

export default Seat
