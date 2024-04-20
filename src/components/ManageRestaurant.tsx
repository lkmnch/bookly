import React from "react"
import RestaurantPage from "./RestaurantPage"
import { Button } from "./ui/button"
import Link from "next/link"

function ManageRestaurant({ id }: { id: string }) {
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex gap-4 justify-end'>
				<Button>Bearbeiten</Button>
				<Link href={`/administration/${id}/editSeatingplan`}>
					<Button className='w-full'>Sitzplan bearbeiten</Button>
				</Link>
			</div>

			<RestaurantPage id={id} />
		</div>
	)
}

export default ManageRestaurant
