import React from "react"
import RestaurantPage from "./RestaurantPage"
import { Button } from "./ui/button"
import Link from "next/link"

function ManageRestaurant({ id }: { id: string }) {
	return (
		<>
			<div className='flex gap-4'>
				<Button>Bearbeiten</Button>
				<Link href={`/administration/${id}/editSeatingplan`}>
					<Button className='w-full'>Sitzplan bearbeiten</Button>
				</Link>
			</div>

			<RestaurantPage id={id} />
		</>
	)
}

export default ManageRestaurant
