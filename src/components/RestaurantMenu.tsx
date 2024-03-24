"use client"
import { useState } from "react"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card"
import { Separator } from "./ui/separator"
import { IMenuItem, MenuItemsByCategory } from "@/lib/types/restaurant"

function RestaurantMenu() {
	const [selectedCategory, setSelectedCategory] = useState("All")
	const menuItems: IMenuItem[] = [
		{
			id: 0,
			name: "Pizza Margherita",
			description: "Pizza with extra cheese",
			category: "pizza",
			price: 7.99,
		},
		{
			id: 1,
			name: "Spaghetti Bolognese",
			description: "Classic Italian pasta dish",
			category: "pasta",
			price: 9.99,
		},
		{
			id: 2,
			name: "Caesar Salad",
			description: "Fresh salad with Caesar dressing",
			category: "salat",
			price: 5.99,
		},
	]
	const categorys = menuItems.map((item) => item.category)

	function groupMenuItemsByCategory(
		menuItems: IMenuItem[]
	): MenuItemsByCategory {
		return menuItems.reduce((groups: MenuItemsByCategory, item) => {
			const { category } = item
			if (!groups[category]) {
				groups[category] = []
			}
			groups[category].push(item)
			console.log(groups)
			return groups
		}, {})
	}

	const getFilteredMenuItems = (category: string) => {
		if (category === "All") {
			return menuItems
		}
		return menuItems.filter((item) => item.category === category)
	}

	return (
		<div>
			<div className='flex mb-4'>
				<button
					onClick={() => setSelectedCategory("All")}
					className={`mr-2 ${selectedCategory === "All" ? "font-bold" : ""}`}>
					Alle
				</button>

				{categorys.map((category) => (
					<div className='flex gap-1' key={category}>
						<Separator orientation='vertical' />
						<button
							onClick={() => setSelectedCategory(category)}
							className={`mr-2 ${
								selectedCategory === category ? "font-bold" : ""
							}`}>
							{category[0].toUpperCase() + category.slice(1)}
						</button>
					</div>
				))}
			</div>
			<Separator className='mb-4' />

			<div className='flex flex-col gap-2'>
				{getFilteredMenuItems(selectedCategory).map((item, index) => (
					<Card key={item.id}>
						<CardHeader>
							<CardTitle>{item.name}</CardTitle>
							<CardDescription>{item.description}</CardDescription>
						</CardHeader>
						<CardContent>{item.price} €</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}

export default RestaurantMenu
