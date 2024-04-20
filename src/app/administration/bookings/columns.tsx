"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Booking = {
	id: string
	dateTime: number
	seats: number
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
}

export const columns: ColumnDef<Booking>[] = [
	{
		accessorKey: "dateTime",
		header: "DateTime",
	},

	{
		accessorKey: "seats",
		header: "Seats",
	},
	{
		accessorKey: "firstName",
		header: "Vorname",
	},
	{
		accessorKey: "lastName",
		header: "Nachname",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "phoneNumber",
		header: "Telefon",
	},
]
