"use client"

import { createContext, useState } from "react"
import {
	RestaurantType,
	RestaurantContextType,
	seatingPlanType,
} from "../../lib/types/restaurant"

export const AppContext = createContext<RestaurantContextType | null>(null)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [dateTime, setDateTime] = useState<Date>()
	return (
		<AppContext.Provider
			value={{
				setDateTime: setDateTime,
				dateTime: dateTime,
			}}>
			{children}
		</AppContext.Provider>
	)
}

export default AppProvider
