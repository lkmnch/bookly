import "./App.css"
import Navigation from "./components/Navigation"
import RestaurantList from "./components/RestaurantList"

//App wird mit react router nicht gebraucht einzelne Routen direkt in Main
function App() {
	return (
		<>
			<h1>Bookly</h1>
			<p className='read-the-docs'>App for booking Seats in Restaurants.</p>
			<Navigation />
		</>
	)
}

export default App
