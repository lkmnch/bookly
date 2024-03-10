import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card"
import imgUrl from "../assets/placeholder-image.png"
import Rating from "./Rating"
import { Link } from "react-router-dom"
import { IRestaurant, RestaurantContextType } from "@/@types/restaurant"
import { useContext } from "react"
import { AppContext } from "@/context/AppProvider"

function Restaurant({ id, name, description, average_rating }: IRestaurant) {
	const { setCurrentId } = useContext(AppContext) as RestaurantContextType
	return (
		<Card className=' hover:bg-slate-50' onClick={() => setCurrentId(id)}>
			<Link to={`/restaurants/${id}`} className='flex'>
				<div>
					<img id='CardImage' src={imgUrl} />
				</div>
				<div>
					<CardHeader>
						<CardTitle>{name}</CardTitle>
						<CardDescription>{description}</CardDescription>
					</CardHeader>
					<CardContent>
						<Rating rating={average_rating} />
					</CardContent>
				</div>
			</Link>
		</Card>
	)
}

export default Restaurant
