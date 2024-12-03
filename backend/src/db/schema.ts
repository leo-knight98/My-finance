import { integer,
		pgTable,
		varchar,
		serial, pgEnum,
		timestamp,
		date
	} from "drizzle-orm/pg-core"

export const users = pgTable('users', {
    id: serial().primaryKey().notNull(),
    name: varchar({length: 50}).notNull(),
    email: varchar({length: 50}).notNull(),
    password: varchar({length: 150}).notNull(),
    created_at: timestamp().defaultNow(),
    modified_at: timestamp().defaultNow()
});
export const categoriesEnum = pgEnum('type', ['income', 'expense', 'debt'])
export const categories = pgTable('categories', {
	id: serial().primaryKey(),
	user_id: integer().references(() => users.id, {onDelete: "cascade", onUpdate: "cascade"}),
	name: varchar({length: 50}),
	type: categoriesEnum(),
})
export const transactions = pgTable('transactions', {
	id: serial().primaryKey(),
	user_id: integer().references(() => users.id, {onDelete: "cascade", onUpdate: "cascade"}),
	type: categoriesEnum(),
	category_id: integer().references(() => categories.id, {onDelete: "cascade", onUpdate: "cascade"}),
	date: date().defaultNow(),
	description: varchar({length: 150}),
	amount: integer().notNull()
})
export const goals = pgTable('goals', {
	id: serial().primaryKey(),
	user_id: integer().references(() => users.id, {onDelete: "cascade", onUpdate: "cascade"}),
	name: varchar({length: 50}).notNull(),
	target_amount: integer().notNull(),
	current_amount: integer().notNull(),
	due_date: date().notNull(),
	created_at: timestamp().defaultNow().notNull(),
	modified_at: timestamp().defaultNow().notNull()
})
export const statusEnum = pgEnum('status', ['owed', 'receivable'])
export const debts = pgTable('debts', {
	id: serial().primaryKey(),
	user_id: integer().references(() => users.id, {onDelete: "cascade", onUpdate: "cascade"}),
	contact_name: varchar({length: 50}).notNull(),
	date: date().notNull().defaultNow(),
	due_date: date().notNull(),
	status: statusEnum()
})
export const budgets = pgTable('budgets', {
	id: serial().primaryKey(),
	user_id: integer().references(() => users.id, {onDelete: "cascade", onUpdate: "cascade"}),
	category_id: integer().references(() => categories.id, {onDelete: "cascade", onUpdate: "cascade"}),
	monthly_limit: integer(),
	created_at: timestamp().notNull().defaultNow(),
	modified_at: timestamp().notNull().defaultNow()
})