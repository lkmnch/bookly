"use client"

import { createContext, useState } from "react"
import {
	IRestaurant,
	RestaurantContextType,
	seatingPlanType,
} from "../../lib/types/restaurant"

export const AppContext = createContext<RestaurantContextType | null>(null)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [restaurantList, setRestaurantList] = useState<IRestaurant[]>([
		{
			id: 0,
			name: "Bella Italia",
			description:
				"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio repellat cupiditate expedita quos cum at quia vero quis dolore consequuntur.",
			average_rating: 4,
		},
		{
			id: 1,
			name: "Steinberger Pizza Döner",
			description:
				"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio repellat cupiditate expedita quos cum at quia vero quis dolore consequuntur.",
			average_rating: 3,
		},
		{
			id: 2,
			name: "Stadtliebe Bar & Restaurant",
			description:
				"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio repellat cupiditate expedita quos cum at quia vero quis dolore consequuntur.",
			average_rating: 4,
		},
	])
	const [seatingPlan, setSeatingPlan] = useState<seatingPlanType>()
	const [dateTime, setDateTime] = useState<Date>()
	return (
		<AppContext.Provider
			value={{
				restaurants: restaurantList,
				seatingPlan: seatingPlan,
				setSeatingPlan: setSeatingPlan,
				setDateTime: setDateTime,
				dateTime: dateTime,
			}}>
			{children}
		</AppContext.Provider>
	)
}

export default AppProvider
