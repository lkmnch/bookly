export interface IRestaurant {
	id: number
	name: string
	description: string
	average_rating: number
}

export type RestaurantContextType = {
	restaurants: IRestaurant[]
	currentId: number
	setCurrentId: React.Dispatch<React.SetStateAction<number>>
	setSeatingPlan: React.Dispatch<
		React.SetStateAction<seatingPlanType | undefined>
	>
}

export interface IMenuItem {
	id: number
	name: string
	description: string
	category: string
	price: number
}

export type MenuItemsByCategory = {
	[category: string]: IMenuItem[]
}

export type SeatType = {
	id: number
	label: string
}

export type activeSeatType = {
	activeSeat: SeatType
	overId: number
}

export type seatingPlanType = {
	activeSeats: activeSeatType[]
	restaurantId?: number
}
