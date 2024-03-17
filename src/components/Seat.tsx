import { useDraggable } from "@dnd-kit/core"
import { SeatType } from "@/@types/restaurant"

const Seat = ({ id, label }: SeatType) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id,
	})

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: undefined

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className='bg-orange-300  rounded cursor-move h-10 w-10'>
			{label}
		</div>
	)
}

export default Seat
