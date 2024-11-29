DROP database IF EXISTS jla_finance;
CREATE DATABASE jla_finance;
CREATE TABLE jla_finance.users(
    id INTEGER primary key auto_increment,
    name text not null,
    email text not null unique,
    password text,
    created_at text default TIME(now),
    modified_at text default TIME(now)
);

CREATE TABLE jla_finance.categories(
	id INTEGER PRIMARY KEY auto_increment,
	user_id INTEGEREGER,
	name text,
	type ENUM("income", "expense", "debt"),
	FOREIGN KEY(user_id) REFERENCES jla_finance.users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE jla_finance.transactions(
	id INTEGER PRIMARY KEY auto_increment,
	user_id INTEGER,
	type ENUM("income", "expense", "debt"),
	category_id INTEGER,
	date text default DATE(now),
	description text,
	FOREIGN KEY (user_id) REFERENCES jla_finance.users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE jla_finance.goals(
	id INTEGER PRIMARY KEY auto_increment,
	user_id INTEGER,
	name text NOT NULL,
	target_amount INTEGER NOT NULL,
	current_amount INTEGER NOT NULL,
	due_date DATE NOT NULL,
	created_at TEXT default DATETIME(now),
	modified_at TEXT default DATETIME(now),
	FOREIGN KEY(user_id) REFERENCES jla_finance.users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE jla_finance.debts(
	id INTEGER PRIMARY KEY auto_increment,
	user_id INTEGER,
	contact_name text NOT NULL,
	amount INTEGER NOT NULL,
	date TEXT default DATE(now),
	due_date TEXT NOT NULL,
	status ENUM("owed", "receivable"),
	FOREIGN KEY (user_id) REFERENCES jla_finance.users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);
CREATE TABLE jla_finance.budgets(
	id INTEGER PRIMARY KEY auto_increment,
	user_id INTEGER,
	category_id INTEGER,
	monthly_limit INTEGER,
	created_at TEXT default DATETIME(now),
	modified_at TEXT default DATETIME(now),
	FOREIGN KEY (user_id) REFERENCES jla_finance.users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (category_id) REFERENCES jla_finance.categories(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);