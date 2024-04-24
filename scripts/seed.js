const { db } = require("@vercel/postgres")
const { error } = require("console")
require("dotenv").config({ path: ".env.development.local" })
async function seedOwners(client) {
	try {
		const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS owner (
            owner_id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );`
		console.log(`Created "owner" table`)

		const insertedOwners = await client.sql`
        INSERT INTO owner (name)
        VALUES ('Loukmane');
        `
		console.log(`Seed ${insertedOwners.length} owners `)

		return {
			createTable,
			owners: insertedOwners,
		}
	} catch (error) {
		console.error("Error seeding owners:", error)
		throw error
	}
}

async function seedRestaurant(client) {
	try {
		const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS restaurant (
            restaurant_id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            fk_owner_id INTEGER,
            FOREIGN KEY (fk_owner_id) REFERENCES owner(owner_id)
        );`
		const insertedRestaurants = await client.sql`
        INSERT INTO restaurant (name, description, fk_owner_id) VALUES (
            'restaurant1', 'gutes restaurant', 1
        );
        `
		console.log(`Seed ${insertedRestaurants} restaurants `)

		return {
			createTable,
			restaurants: insertedRestaurants,
		}
	} catch (error) {
		console.error("Error seeding owners:", error)
		throw error
	}
}

async function seedMenu(client) {
	try {
		const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS menu (
            menu_id SERIAL PRIMARY KEY,
            fk_restaurant_id INTEGER,
            FOREIGN KEY (fk_restaurant_id) REFERENCES restaurant(restaurant_id)
        );`
		const insertedMenu = await client.sql`
        INSERT INTO menu (fk_restaurant_id) VALUES (1);
        `
		console.log(`Seed ${insertedMenu} menu `)
		return {
			createTable,
			menus: insertedMenu,
		}
	} catch (error) {
		console.error("Error seeding menues:", error)
		throw error
	}
}

async function seedDish(client) {
	try {
		const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS dish (
            dish_id SERIAL PRIMARY KEY,
            fk_menu_id INTEGER,
            name varchar(255),
            description TEXT,
            price DECIMAL(10, 2),
            FOREIGN KEY (fk_menu_id) REFERENCES menu(menu_id)
        );`
		const insertedDishes = await client.sql`
        INSERT INTO dish (fk_menu_id, name, description, price) VALUES (1, 'Pizza', 'Große Pizza mit Käse', 6.00 );
        `
		console.log(`Seed ${insertedDishes} menu `)
		return {
			createTable,
			menus: insertedDishes,
		}
	} catch (error) {
		console.error("Error seeding dishes:", error)
		throw error
	}
}
async function seedRestaurantPlan(client) {
	try {
		const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS restaurantPlan (
            restaurantPlan_id SERIAL PRIMARY KEY,
            fk_restaurant_id INTEGER,
            FOREIGN KEY (fk_restaurant_id) REFERENCES restaurant(restaurant_id)
        );`
		const insertedrestaurantPlan = await client.sql`
        INSERT INTO restaurantPlan (fk_restaurant_id) VALUES (1);
        `
		console.log(`Seed ${insertedrestaurantPlan} menu `)
		return {
			createTable,
			restaurantPlans: insertedrestaurantPlan,
		}
	} catch (error) {
		console.error("Error seeding restaurantPlans:", error)
		throw error
	}
}
async function seedBooking(client) {
	try {
		const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS booking (
            booking_id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            phone_number VARCHAR(20),
            email VARCHAR(255)
        );`
		const insertedBookings = await client.sql`
        INSERT INTO booking (name, phone_number, email) VALUES ('Kunde1', '12345678', 'mail@mail.com');
        `
		console.log(`Seed ${insertedBookings} menu `)
		return {
			createTable,
			bookings: insertedBookings,
		}
	} catch (error) {
		console.error("Error seeding bookings:", error)
		throw error
	}
}
async function seedSeat(client) {
	try {
		const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS seat (
            seat_id SERIAL PRIMARY KEY,
            seat_number INTEGER,
            is_reserved BOOLEAN,
            fk_restaurantPlan_id INTEGER,
            fk_booking_id INTEGER,
            FOREIGN KEY (fk_restaurantPlan_id) REFERENCES restaurantPlan(restaurantPlan_id),
            FOREIGN KEY (fk_booking_id) REFERENCES booking(booking_id)
        );`
		const insertedSeat = await client.sql`
        INSERT INTO seat (seat_number, is_reserved, fk_restaurantPlan_id) VALUES (1, false, 1);
        `
		console.log(`Seed ${insertedSeat} menu `)
		return {
			createTable,
			seats: insertedSeat,
		}
	} catch (error) {
		console.error("Error seeding seats:", error)
		throw error
	}
}
async function seedTable(client) {
	try {
		const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS restaurantTable (
            table_id SERIAL PRIMARY KEY,
            table_number INTEGER,
            fk_restaurantPlan_id INTEGER,
            FOREIGN KEY (fk_restaurantPlan_id) REFERENCES restaurantPlan(restaurantPlan_id)
        );`
		const insertedTables = await client.sql`
        INSERT INTO restaurantTable (table_number, fk_restaurantPlan_id) VALUES (1, 1);
        `
		console.log(`Seed ${insertedTables} menu `)
		return {
			createTable,
			tables: insertedTables,
		}
	} catch (error) {
		console.error("Error seeding Tables:", error)
		throw error
	}
}

async function main() {
	const client = await db.connect()

	await seedOwners(client)
	await seedRestaurant(client)
	await seedMenu(client)
	await seedDish(client)
	await seedRestaurantPlan(client)
	await seedBooking(client)
	await seedSeat(client)
	await seedTable(client)
	await client.end()
}

main().catch((error) => {
	console.error(
		"An error occurred while attempting to seed the database:",
		error
	)
})
