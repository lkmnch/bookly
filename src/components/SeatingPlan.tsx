"use client"
import { useState, useContext, useEffect } from "react"
import { Active, DndContext, DragEndEvent, Over } from "@dnd-kit/core"
import Canvas from "./Canvas"
import Seat from "./Seat"
import {
	RestaurantContextType,
	RestaurantType,
	SeatType,
	activeSeatType,
	restaurantDataType,
} from "@/lib/types/restaurant"
import RemoveSeat from "./RemoveSeat"
import { AppContext } from "@/app/context/AppProvider"
import { Button } from "./ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Toast } from "./ui/toast"
import { Toaster } from "./ui/toaster"
import { Plus, Save, Trash2 } from "lucide-react"

function SeatingPlan({ id }: { id: string }) {
	const [seats, setSeats] = useState<SeatType[]>([])
	const [restaurant, setRestaurant] = useState<any>()
	const [draggedSeats, setDraggedSeats] = useState<SeatType[]>([])
	const [activeSeats, setActiveSeats] = useState<activeSeatType[]>([])
	const [nextSeatId, setNextSeatId] = useState(1)
	const { toast } = useToast()
	useEffect(() => {
		const userData = localStorage.getItem("restaurants")

		if (userData) {
			const parsedData = JSON.parse(userData)
			console.log(parsedData[id])
			setRestaurant(parsedData[id])
			if (parsedData[id].seatingPlan) {
				const seatingPlan = parsedData[id].seatingPlan
				if (seatingPlan) {
					setActiveSeats(seatingPlan)
				}
			}
		}
	}, [])

	const addSeat = () => {
		const newSeat = { id: nextSeatId, label: `S ${nextSeatId}` }
		setSeats([...seats, newSeat])
		setNextSeatId(nextSeatId + 1)
	}

	const saveSeatingplan = () => {
		const data = localStorage.getItem("restaurants")
		if (data) {
			try {
				const parsedData = JSON.parse(data)
				const updatedRestaurant = {
					...parsedData[id],
					seatingPlan: activeSeats,
				}

				const updatedRestaurants = {
					...parsedData,
					[id]: updatedRestaurant,
				}
				localStorage.setItem("restaurants", JSON.stringify(updatedRestaurants))
				console.log("gespeichert")
				toast({
					title: "Sitzplan gespeichert",
					description: "Der Sitzplan wurde gespeichert",
				})
			} catch (error) {
				console.log("🚀 ~ saveSeatingplan ~ error:", error)
				toast({
					variant: "destructive",
					title: "Sitzplan gespeichert",
					description: "Der Sitzplan wurde nicht gespeichert",
				})
			}
		}
	}

	const updateActiveSeats = (
		seatArray: SeatType[],
		over: Over,
		active: Active
	) => {
		if (over != null) {
			const isOverIdInActiveSeats = activeSeats.some((activeSeat) => {
				return activeSeat.overId == over.id
			})

			if (!isOverIdInActiveSeats) {
				const newActiveSeat = {
					activeSeat: seatArray.find((s) => s.id === active.id) as SeatType,
					overId: over.id as number, //if(over.id in seatArray){seatArray.overId}else{over.id}
				}
				if (newActiveSeat) {
					const isNewActiveSeatIncluded = activeSeats.some(
						(activeSeat, index) => {
							const isActiveSeatMatch =
								activeSeat.activeSeat.id === newActiveSeat.activeSeat.id &&
								activeSeat.activeSeat.label === newActiveSeat.activeSeat.label
							console.log(isActiveSeatMatch)
							if (isActiveSeatMatch) {
								activeSeats[index].overId = newActiveSeat.overId
							}

							return isActiveSeatMatch
						}
					)

					if (!isNewActiveSeatIncluded) {
						setActiveSeats([...activeSeats, newActiveSeat])
					}
				}

				setSeats(seats.filter((s) => s.id !== active.id))
			}
			if (over.id === "remove-area") {
				const filteredDraggedSeats = seatArray.filter(
					(seat) => seat.id !== active.id
				)
				setDraggedSeats(filteredDraggedSeats)
				const filteredActiveSeats = activeSeats.filter(
					(activeSeat) => activeSeat.activeSeat.id !== active.id
				)
				setActiveSeats(filteredActiveSeats)
			}
		}
	}
	const handleDragEnd = (event: DragEndEvent) => {
		console.log(event)
		const { active, over } = event
		const draggedSeat = seats.find((s) => s.id === active.id)
		console.log(draggedSeat)
		if (draggedSeat) {
			setDraggedSeats((prevDraggedSeats) => {
				const newDraggedSeats = [...prevDraggedSeats, draggedSeat]
				updateActiveSeats(newDraggedSeats, over as Over, active)
				return newDraggedSeats
			})
		} else {
			updateActiveSeats(draggedSeats, over as Over, active)
		}
	}

	return (
		<DndContext onDragEnd={handleDragEnd}>
			<div className='flex justify-between'>
				{restaurant && (
					<h1 className='text-4xl font-bold'>
						Sitzplan für {restaurant?.restaurantName}{" "}
					</h1>
				)}
				<div className='flex gap-2'>
					<Button onClick={saveSeatingplan}>
						{" "}
						<Save /> Sitzplan speichern
					</Button>
					<Button>
						{" "}
						<Trash2 /> Sitzplan löschen
					</Button>
				</div>
			</div>

			<div className='flex justify-between'>
				<div className='ml-4 flex gap-1 flex-wrap '>
					<Canvas activeSeats={activeSeats} id={id} />
				</div>
				<div className='flex flex-col gap-4'>
					<Button onClick={addSeat}>
						{" "}
						<Plus /> Sitz hinzufügen
					</Button>

					<div className='bg-slate-500 w-80 h-96 rounded-md flex flex-wrap'>
						{seats.map((seat) => (
							<Seat key={seat.id} id={seat.id} label={seat.label} />
						))}
					</div>
					<RemoveSeat />
				</div>
			</div>
			<Toaster />
		</DndContext>
	)
}

export default SeatingPlan
