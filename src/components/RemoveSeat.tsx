import { useDroppable } from "@dnd-kit/core"
import { Trash2 } from "lucide-react"

function RemoveSeat() {
	const { setNodeRef } = useDroppable({
		id: "remove-area",
	})
	return (
		<div
			ref={setNodeRef}
			className='bg-slate-800 text-white px-4 py-2 rounded-md mb-4 h-fit w-full flex gap-1 text-sm justify-center align-middle '>
			<Trash2 />
			<div className=' text-nowrap'>Sitz löschen</div>
		</div>
	)
}

export default RemoveSeat
