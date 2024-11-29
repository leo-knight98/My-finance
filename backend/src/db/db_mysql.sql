DROP database IF EXISTS jla_finance;
CREATE DATABASE jla_finance;
CREATE TABLE jla_finance.users(
    id INT primary key auto_increment,
    name VARCHAR(50) not null,
    email VARCHAR(50) not null unique,
    password VARCHAR(50),
    created_at DATETIME default CURRENT_TIMESTAMP(),
    modified_at DATETIME default CURRENT_TIMESTAMP()
);

CREATE TABLE jla_finance.categories(
	id INT PRIMARY KEY auto_increment,
	user_id INT,
	name VARCHAR(50),
	type ENUM("income", "expense", "debt"),
	FOREIGN KEY(user_id) REFERENCES jla_finance.users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE jla_finance.transactions(
	id INT PRIMARY KEY auto_increment,
	user_id INT,
	type ENUM("income", "expense", "debt"),
	category_id INT,
	date DATE default(CURRENT_DATE()),
	description VARCHAR(150),
	FOREIGN KEY (user_id) REFERENCES jla_finance.users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE jla_finance.goals(
	id INT PRIMARY KEY auto_increment,
	user_id INT,
	name VARCHAR(50) NOT NULL,
	target_amount INT NOT NULL,
	current_amount INT NOT NULL,
	due_date DATE NOT NULL,
	created_at DATETIME default CURRENT_TIMESTAMP(),
	modified_at DATETIME default CURRENT_TIMESTAMP(),
	FOREIGN KEY(user_id) REFERENCES jla_finance.users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE jla_finance.debts(
	id INT PRIMARY KEY auto_increment,
	user_id INT,
	contact_name VARCHAR(50) NOT NULL,
	amount INT NOT NULL,
	date DATE default(CURRENT_DATE()),
	due_date DATE NOT NULL,
	status ENUM("owed", "receivable"),
	FOREIGN KEY (user_id) REFERENCES jla_finance.users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);
CREATE TABLE jla_finance.budgets(
	id INT PRIMARY KEY auto_increment,
	user_id INT,
	category_id INT,
	monthly_limit INT,
	created_at DATETIME default CURRENT_TIMESTAMP(),
	modified_at DATETIME default CURRENT_TIMESTAMP(),
	FOREIGN KEY (user_id) REFERENCES jla_finance.users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (category_id) REFERENCES jla_finance.categories(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);