import { UniqueIdentifier, useDroppable } from "@dnd-kit/core"

import Seat from "./Seat"
import { SeatType } from "@/@types/restaurant"

function CanvasTile({
	id,
	overId,
	activeSeat,
}: {
	id: number
	overId: UniqueIdentifier
	activeSeat: SeatType | undefined
}) {
	const { setNodeRef } = useDroppable({
		id: id,
	})
	// console.log("tile" + id)
	// console.log("overId" + overId)
	return (
		<div ref={setNodeRef} className='bg-slate-200   border-2 border-gray-500'>
			{/* <span>{id}</span> */}
			{activeSeat?.id && id == overId && (
				<Seat
					key={activeSeat?.id}
					id={activeSeat?.id}
					label={activeSeat?.label}
				/>
			)}
		</div>
	)
}

export default CanvasTile
