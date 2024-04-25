import React from "react"
import { sql } from "@vercel/postgres"
import { RestaurantType } from "@/lib/types/restaurant"
import RestaurantList from "@/components/RestaurantList"

async function Page() {
	const { rows } = await sql`SELECT*FROM restaurant`
	const restaurants: RestaurantType[] = rows as RestaurantType[]
	console.log("restaruants:", restaurants)
	return <RestaurantList restaurants={restaurants} />
}

export default Page
