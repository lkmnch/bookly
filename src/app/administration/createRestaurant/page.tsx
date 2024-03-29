"use client"
import React, { FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { restaurantDataType } from "@/lib/types/restaurant"

function page() {
	const formSchema = z.object({
		restaurantName: z
			.string()
			.min(2, { message: "Restaurantname muss mindestens 2 Zeichen lang sein" })
			.max(50, { message: "Restaurantname darf maximal 50 Zeichen lang sein" }),
		restaurantDescription: z.string().max(500),
	})
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			restaurantName: "",
			restaurantDescription: "",
		},
	})
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		const id = 0
		const data = localStorage.getItem("restaurants")
		if (data) {
			const parsedData = JSON.parse(data)
			console.log("🚀 ~ onSubmit ~ parsedData:", parsedData)
			const newId = id + 1
			const newData = { ...parsedData, [newId]: { ...values } }
			try {
				localStorage.setItem("restaurants", JSON.stringify(newData))
			} catch (error) {
				console.log(error)
			}
		} else {
			const data: restaurantDataType = { [id]: { ...values } }

			localStorage.setItem("restaurants", JSON.stringify(data))
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-10'>
				<FormField
					control={form.control}
					name='restaurantName'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-xl'>Restaurantname</FormLabel>
							<FormControl>
								<Input placeholder='Restaurantname eingeben' {...field} />
							</FormControl>
							<FormDescription>
								Das ist der Name deines Restaurants
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='restaurantDescription'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-xl'>Restaurantbeschreibung</FormLabel>
							<FormControl>
								<Textarea
									className='resize-none'
									placeholder='Restaurantbeschreibung eingeben'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Das ist die Beschreibung deines Restaurants
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Restaurant anlegen</Button>
			</form>
		</Form>
	)
}

export default page
