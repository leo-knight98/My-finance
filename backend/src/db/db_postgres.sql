--CREATE DATABASE jla_finance;
CREATE type enum_category
AS
ENUM('income', 'expense', 'debt');
create type enum_debt
as
ENUM('owed', 'receivable');

--drop table if exists users;
CREATE table users(
    id serial primary key,
    name VARCHAR(50) not null,
    email VARCHAR(50) not null unique,
    password VARCHAR(50),
    created_at TIMESTAMP default NOW(),
    modified_at TIMESTAMP default NOW()
);

--drop table if exists categories;
CREATE TABLE categories(
	id serial PRIMARY KEY,
	user_id INT,
	name VARCHAR(50),
	type enum_category,
	FOREIGN KEY(user_id) REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

--drop table if exists transactions;
CREATE table transactions(
	id serial PRIMARY KEY,
	user_id INT,
	type enum_category,
	category_id INT,
	date DATE default CURRENT_DATE,
	description VARCHAR(150),
	FOREIGN KEY (user_id) REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

--drop if exists table goals;
CREATE TABLE goals(
	id serial PRIMARY KEY,
	user_id INT,
	name VARCHAR(50) NOT NULL,
	target_amount INT NOT NULL,
	current_amount INT NOT NULL,
	due_date DATE NOT NULL,
	created_at TIMESTAMP not null default NOW(),
	modified_at TIMESTAMP not null default NOW(),
	FOREIGN KEY(user_id) REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

--drop if exists table debts;
CREATE TABLE debts(
	id serial PRIMARY KEY,
	user_id INT,
	contact_name VARCHAR(50) NOT NULL,
	amount INT NOT NULL,
	date DATE not null default CURRENT_DATE,
	due_date DATE NOT NULL,
	status enum_debt not null,
	FOREIGN KEY (user_id) REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

--drop if exists table budgets;
CREATE TABLE budgets(
	id serial PRIMARY KEY,
	user_id INT,
	category_id INT,
	monthly_limit INT,
	created_at TIMESTAMP not null default NOW(),
	modified_at TIMESTAMP not null default NOW(),
	FOREIGN KEY (user_id) REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (category_id) REFERENCES categories(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);