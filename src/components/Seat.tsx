import { useDraggable } from "@dnd-kit/core"
import Canvas from "./Canvas"
import { useSortable } from "@dnd-kit/sortable"

interface SeatProps {
	id: string
	label: string
}

const Seat = ({ id, label }: SeatProps) => {
	const { attributes, listeners, setNodeRef, transform } = useSortable({
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
			className='bg-gray-200 p-2  m-2 rounded cursor-move'>
			{label}
		</div>
	)
}

export default Seat
