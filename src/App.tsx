import "./App.css"
import Navigation from "./components/Navigation"
/* import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable" */
import { Outlet } from "react-router-dom"

function App() {
	return (
		<div className=' flex h-screen'>
			<div id='sidebar' className='bg-lime-950 text-white h-screen'>
				<h1>Bookly</h1>
				<Navigation />
			</div>
			<main className=' mt-5 overflow-y-auto p-4 flex-1'>
				<Outlet />
			</main>

			{/* <p className='read-the-docs'>App for booking Seats in Restaurants.</p> */}
		</div>
	)
}

export default App
