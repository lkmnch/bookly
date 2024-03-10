import { Link } from "react-router-dom"

function Navigation() {
	return (
		<div className='flex flex-col gap-4 p-4'>
			<Link to={"/restaurants"}>
				<button>Restaurants </button>
			</Link>
			<Link to={"/bookings"}>
				<button>Bookings</button>
			</Link>
			<Link to={"/profile"}>
				<button>Profile</button>
			</Link>

			<Link to={"/administration"}>
				<button>Administration</button>
			</Link>
		</div>
	)
}

export default Navigation
