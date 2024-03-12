import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card"
import { Separator } from "./ui/separator"

function RestaurantMenu() {
	const menuItems = [
		{
			name: "Pizza Margherita",
			description: "Pizza with extra cheese",
			category: "pizza",
			price: 7.99,
		},
		{
			name: "Spaghetti Bolognese",
			description: "Classic Italian pasta dish",
			category: "pasta",
			price: 9.99,
		},
		{
			name: "Caesar Salad",
			description: "Fresh salad with Caesar dressing",
			category: "salat",
			price: 5.99,
		},
	]

	return (
		<>
			<div className='flex h-5 items-center space-x-4 text-sm'>
				<div>Pizza</div>
				<Separator orientation='vertical' />
				<div>Burger</div>
				<Separator orientation='vertical' />
				<div>Pasta</div>
				<Separator orientation='vertical' />
				<div>Salat</div>
			</div>
			<Separator />
			<div className='flex flex-col gap-2'>
				{menuItems.map((item, index) => (
					<Card key={index}>
						<CardHeader>
							<CardTitle>{item.name}</CardTitle>
							<CardDescription>
								<p>{item.description}</p>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>{item.price} €</p>
						</CardContent>
					</Card>
				))}
			</div>
		</>
	)
}

export default RestaurantMenu

/* function groupMenuItemsByCategory(menuItems) {
    return menuItems.reduce((groups, item) => {
      const { category } = item;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    }, {});
  }

  <div className='flex flex-col gap-2'>
  {Object.entries(groupMenuItemsByCategory(menuItems)).map(([category, items]) => (
    <div key={category}>
      <h2 className="text-lg font-bold mb-2">{category}</h2>
      <div className='flex flex-col gap-2'>
        {items.map((item, index) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>
                <p>{item.description}</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{item.price} €</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  ))}
</div> */
