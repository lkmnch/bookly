import Link from "next/link"

function Navigation() {
	return (
		<div className='flex flex-col gap-4 p-4'>
			<Link href={"/restaurants"}>
				<button>Restaurants </button>
			</Link>
			<Link href={"/bookings"}>
				<button>Bookings</button>
			</Link>
			<Link href={"/profile"}>
				<button>Profile</button>
			</Link>

			<Link href={"/administration"}>
				<button>Administration</button>
			</Link>
		</div>
	)
}

export default Navigation
