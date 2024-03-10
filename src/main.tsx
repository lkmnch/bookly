import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.tsx"
import "./index.css"
import Profile from "./components/Profile.tsx"
import RestaurantList from "./components/RestaurantList.tsx"
import BookingList from "./components/BookingList.tsx"
import Administration from "./components/Administration.tsx"
import RestaurantInfoCard from "./components/RestaurantInfoCard.tsx"
import AppProvider from "./context/AppProvider.tsx"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/profile",
				element: <Profile />,
			},
			{
				path: "/restaurants",
				element: <RestaurantList />,
			},
			{
				path: "/restaurants/:id",
				element: <RestaurantInfoCard />,
			},
			{
				path: "/bookings",
				element: <BookingList />,
			},
			{
				path: "/administration",
				element: <Administration />,
			},
		],
	},
])
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AppProvider>
			<RouterProvider router={router} />
		</AppProvider>
	</React.StrictMode>
)
