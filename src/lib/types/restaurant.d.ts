export type RestaurantType = {
	restaurant_id: number
	name: string
	description: string
	fk_owner_id?: number
	thumbnail_url?: string
	image1_url?: string
}

export type restaurantDataType = {
	[id: string]: {
		restaurantName: string
		restaurantDescription: string
		restaurantThumbnail: string
		seatingplan: activeSeatType[]
		bookings: bookingType[]
	}
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
	booking_id: number
	date_time: Date
	name: string
	email: string
	phone_number: string
	fk_restaurant_id: number
}
