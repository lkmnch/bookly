import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.tsx"
import "./index.css"
import RestaurantList from "./components/RestaurantList.tsx"
import BookingList from "./components/BookingList.tsx"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/restaurants",
		element: <RestaurantList />,
	},
	{
		path: "/bookings",
		element: <BookingList />,
	},
])
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
