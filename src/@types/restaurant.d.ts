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
}
