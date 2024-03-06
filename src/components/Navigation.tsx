import { Link } from "react-router-dom"

function Navigation() {
	return (
		<ul>
			<Link to={"/restaurants"}>
				<li>Restaurants</li>
			</Link>

			<li>Bookings</li>
			<li>Profile</li>
			<li>Admin</li>
		</ul>
	)
}

export default Navigation
