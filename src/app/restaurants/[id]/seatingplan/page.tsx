"use client"
import { AppContext } from "@/app/context/AppProvider"
import Canvas from "@/components/Canvas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	RestaurantContextType,
	activeSeatType,
	bookingType,
} from "@/lib/types/restaurant"
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
import { useRouter } from "next/navigation"

function Page({ params }: { params: { id: string } }) {
	const [selectedSeats, setSelectedSeats] = useState<activeSeatType[]>([])
	const { dateTime } = useContext(AppContext) as RestaurantContextType
	const router = useRouter()

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
		const data = localStorage.getItem("restaurants")
		if (data) {
			const parsedData = JSON.parse(data)
			const restaurant = parsedData[params.id]
			console.log("🚀 ~ onSubmit ~ restaurant:", restaurant)
			if (dateTime) {
				const bookings: bookingType[] = restaurant.bookings
					? [
							...restaurant.bookings,
							{ dateTime, bookedSeats: selectedSeats, ...values },
					  ]
					: [{ dateTime, bookedSeats: selectedSeats, ...values }]
				console.log("🚀 ~ onSubmit ~ bookings:", bookings)
				try {
					localStorage.setItem(
						"restaurants",
						JSON.stringify({
							...parsedData,
							[params.id]: { ...restaurant, bookings },
						})
					)
					router.push("/")
				} catch (error) {
					console.log("Konnte Buchung nicht erstellen")
				}
			}
		}
	}
	return (
		<div>
			<h1 className='text-4xl font-bold'>Sitzplatz im Restaurant auswählen</h1>
			<div className='flex flex-wrap gap-10 md:flex-nowrap mt-14'>
				<Canvas setSelectedSeats={setSelectedSeats} id={params.id} />
				<div className='flex flex-col gap-3'>
					<div>
						<span className='leading-7 [&:not(:first-child)]:mt-6'>{`Anzahl ausgewählter Sitzplätze: ${selectedSeats.length}`}</span>
					</div>
					<div>
						<div className='leading-7 [&:not(:first-child)]:mt-6'>{`Datum: ${dateTime?.getDate()}.${dateTime?.getMonth()}.${dateTime?.getFullYear()} - ${dateTime?.getHours()}:${dateTime?.getMinutes()} Uhr`}</div>
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
		</div>
	)
}

export default Page
