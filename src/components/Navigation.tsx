import { Link } from "react-router-dom"

function Navigation() {
	return (
		<ul>
			<Link to={"/restaurants"}>
				<li>Restaurants</li>
			</Link>
			<Link to={"/bookings"}>
				<li>Bookings</li>
			</Link>
			<Link to={"/profile"}>
				<li>Profile</li>
			</Link>

			<Link to={"/administration"}>
				<li>Administration</li>
			</Link>
		</ul>
	)
}

export default Navigation
