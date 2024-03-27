import { useState, useContext, useEffect } from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { AppContext } from "@/app/context/AppProvider"
import { RestaurantContextType } from "@/lib/types/restaurant"

function DatePicker() {
	const { setDateTime, dateTime } = useContext(
		AppContext
	) as RestaurantContextType
	const [date, setDate] = useState<Date>()

	useEffect(() => {
		setDateTime(date)
	}, [date])

	useEffect(() => {
		if (dateTime) {
			console.log(dateTime)
		}
	}, [dateTime])
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[240px] justify-start text-left font-normal",
						!date && "text-muted-foreground"
					)}>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{date ? format(date, "dd.LL.yyyy") : <span>Datum auswählen</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				align='start'
				className='flex w-auto flex-col space-y-2 p-2'>
				<Select
					onValueChange={(value) =>
						setDate(addDays(new Date(), parseInt(value)))
					}>
					<SelectTrigger>
						<SelectValue placeholder='Auswählen' />
					</SelectTrigger>
					<SelectContent position='popper'>
						<SelectItem value='0'>Heute</SelectItem>
						<SelectItem value='1'>Morgen</SelectItem>
						<SelectItem value='3'>In 3 Tagen</SelectItem>
						<SelectItem value='7'>In einer Woche</SelectItem>
					</SelectContent>
				</Select>
				<div className='rounded-md border'>
					<Calendar mode='single' selected={date} onSelect={setDate} />
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default DatePicker
