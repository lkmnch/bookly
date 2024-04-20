import { useDraggable } from "@dnd-kit/core"
import { SeatType, activeSeatType } from "@/lib/types/restaurant"
import { useState } from "react"
import { Armchair } from "lucide-react"

type SeatProps = {
	id: number
	label: string
	setSelectedSeats?: React.Dispatch<React.SetStateAction<activeSeatType[]>>
	overId?: number
}

const Seat = ({ id, label, setSelectedSeats, overId }: SeatProps) => {
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

			setSelectedSeats?.((prevSelectedSeats) => {
				return prevSelectedSeats.filter(
					(prevSelectedSeat) => prevSelectedSeat.activeSeat.id !== id
				)
			})
		} else {
			setIsSelected(true)
			if (overId) {
				setSelectedSeats?.((prevSelectedSeats) => [
					...prevSelectedSeats,
					{ activeSeat: { id, label }, overId },
				])
			}
		}
	}

	return (
		<div
			onClick={handleClick}
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className={`${
				!isSelected ? "bg-orange-300" : "bg-orange-700"
			} rounded cursor-move h-10 w-10 text-xs flex flex-col items-center justify-center m-4`}>
			<Armchair />
			{label}
		</div>
	)
}

export default Seat
