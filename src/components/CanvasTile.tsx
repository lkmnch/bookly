import { UniqueIdentifier, useDroppable } from "@dnd-kit/core"

import Seat from "./Seat"
import { activeSeatType } from "@/@types/restaurant"

function CanvasTile({
	id,

	activeSeats,
}: {
	id: number
	activeSeats: activeSeatType[]
}) {
	const { setNodeRef } = useDroppable({
		id: id,
	})

	//ueber activeSeats gehen und nur den nehmen (filter?) welcher die overId hat die die selbe ist wie die tileId

	const activeSeatThatIsOverThisTile = activeSeats.filter(
		(activeSeat) => activeSeat.overId == id
	)

	return (
		<div ref={setNodeRef} className='bg-slate-200   border-2 border-gray-500'>
			{activeSeatThatIsOverThisTile.length == 1 && (
				<Seat
					key={activeSeatThatIsOverThisTile[0]?.activeSeat.id}
					id={activeSeatThatIsOverThisTile[0]?.activeSeat.id}
					label={activeSeatThatIsOverThisTile[0]?.activeSeat.label}
				/>
			)}
		</div>
	)
}

export default CanvasTile
