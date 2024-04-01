"use client"
import { AppContext } from "@/app/context/AppProvider"
import Canvas from "@/components/Canvas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RestaurantContextType, activeSeatType } from "@/lib/types/restaurant"
import React, { useContext, useState } from "react"
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

function page({ params }: { params: { id: string } }) {
	const [selectedSeats, setSelectedSeats] = useState<activeSeatType[]>([])
	const { dateTime } = useContext(AppContext) as RestaurantContextType

	const formSchema = z.object({
		firstName: z.string().min(1, { message: "Please enter your first name" }),
		lastName: z.string().min(1, { message: "Please enter your last name" }),
		email: z.string().email({ message: "Email ist ungültig" }),
		phoneNumber: z
			.string()
			.min(2, { message: "Gib eine gültige Telefonnummer an" })
			.max(50, { message: "Gib eine gültige Telefonnummer an" }),
		specialRequirements: z.string().optional(),
	})
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			specialRequirements: "",
		},
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log("🚀 ~ onSubmit ~ values:", values)
		/* const data = localStorage.getItem("restaurants")
		if (data) {
			const parsedData = JSON.parse(data)
			const keys = Object.keys(parsedData)
			const lastkey = Number(keys[keys.length - 1])
			const newData = { ...parsedData, [lastkey + 1]: { ...values } }
			try {
				localStorage.setItem("restaurants", JSON.stringify(newData))
				router.push("/administration")
			} catch (error) {
				console.log(error)
			}
		} else {
			const data: restaurantDataType = { [0]: { ...values } }
			localStorage.setItem("restaurants", JSON.stringify(data))
			router.push("/administration")
		} */
	}
	return (
		<div className='flex flex-wrap gap-10 md:flex-nowrap'>
			<Canvas setSelectedSeats={setSelectedSeats} id={params.id} />
			<div className='flex flex-col gap-3'>
				<div>
					<span className='leading-7 [&:not(:first-child)]:mt-6'>{`Anzahl ausgewählter Sitzplätze: ${selectedSeats.length}`}</span>
				</div>
				<div>
					<span className='leading-7 [&:not(:first-child)]:mt-6'>{`Datum: ${dateTime}`}</span>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex  flex-wrap gap-10 items-center'>
						<FormField
							control={form.control}
							name='firstName'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-xl'>Vorname</FormLabel>
									<FormControl>
										<Input placeholder='Gib deinen Namen ein' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='lastName'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-xl'>Nachname</FormLabel>
									<FormControl>
										<Input placeholder='Gib deinen Namen ein' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-xl'>Email</FormLabel>
									<FormControl>
										<Input placeholder='Gib deine Email ein' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='phoneNumber'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-xl'>Telefonnummer</FormLabel>
									<FormControl>
										<Input
											placeholder='Gib deine Telefonnummer ein'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='specialRequirements'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-xl'>Anmerkungen</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Hast du uns noch etwas mitzuteilen?'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit'>Buchen</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}

export default page
