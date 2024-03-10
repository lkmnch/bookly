import * as React from "react"
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

function DatePicker() {
	const [date, setDate] = React.useState<Date>()

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
					{date ? format(date, "PPP") : <span>Datum auswählen</span>}
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
