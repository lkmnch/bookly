export type RestaurantType = {
	id: string
	name: string
	description: string
	average_rating?: number
}
export type restaurantDataType = {
	[id: string]: { restaurantName: string; restaurantDescription: string }
}

export type RestaurantContextType = {
	setDateTime: Dispatch<SetStateAction<Date | undefined>>
	dateTime: Date | undefined
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

export type bookingType = {
	customerId: number
	restaurantId: number
	bookedSeats: activeSeatType[]
	dateTime: Date
}
