import React, { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { ClockIcon } from "@radix-ui/react-icons"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"
import { setHours, format, setMinutes } from "date-fns"

function TimePicker() {
	const [time, setTime] = useState<Date>()
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[240px] justify-start text-left font-normal",
						!time && "text-muted-foreground"
					)}>
					<ClockIcon className='mr-2 h-4 w-4' />
					{time ? (
						format(time, "HH:mm") + " Uhr"
					) : (
						<span>Uhrzeit auswählen</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='flex gap-3'>
				<Input
					placeholder='Stunden'
					type='number'
					onChange={(event) =>
						setTime(setHours(new Date(), parseInt(event.target.value)))
					}
				/>
				<span className='font-bold'>:</span>
				<Input
					placeholder='Minuten'
					type='number'
					onChange={(event) =>
						setTime(setMinutes(time as Date, parseInt(event.target.value)))
					}
				/>
			</PopoverContent>
		</Popover>
	)
}

export default TimePicker
