"use client"
import RestaurantList from "@/components/RestaurantList"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { FormEvent, FormEventHandler } from "react"

export default function Home() {
	const router = useRouter()
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		router.push("/restaurants")
	}
	return (
		<main className='  '>
			<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
				Reservieren und mehr
			</h1>
			<h2
				className='mt-5
				scroll-m-20
				text-3xl
				font-semibold
				tracking-tight
				transition-colors
				first:mt-0'>
				Restaurants bei dennen du deinen Platz auswählen kannst
			</h2>

			<form
				onSubmit={(event) => {
					handleSubmit(event)
				}}>
				<div className='flex flex-wrap w-full gap-4 items-center  mt-10 lg:flex-nowrap'>
					<Input
						type='search'
						placeholder='Adresse, z.B. Bergerstraße 1'
						className='h-16'
					/>
					<Button type='submit' className='h-16 w-32'>
						Suchen
					</Button>
				</div>
			</form>
		</main>
	)
}
