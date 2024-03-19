import { useDroppable } from "@dnd-kit/core"

function RemoveSeat() {
	const { setNodeRef } = useDroppable({
		id: "remove-area",
	})
	return (
		<div
			ref={setNodeRef}
			className='bg-red-500 text-white px-4 py-2 rounded mb-4'>
			Remove Seat
		</div>
	)
}

export default RemoveSeat
