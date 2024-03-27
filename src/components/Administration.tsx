import { Button } from "./ui/button"
import SeatingPlan from "./SeatingPlan"
import Link from "next/link"

function Administration() {
	return (
		<>
			<Link href='/administration/seatingplan'>
				<Button className='w-full'>Sitzplan anlegen</Button>
			</Link>

			<Button> Sitzplan bearbeiten</Button>
			<Button>Sitzplan löschen</Button>
		</>
	)
}

export default Administration
