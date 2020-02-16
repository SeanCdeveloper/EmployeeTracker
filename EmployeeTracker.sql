DROP DATABASE IF EXISTS EmployeeTrackerDB;

CREATE DATABASE EmployeeTrackerDB;

USE EmployeeTrackerDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  salary INT(11) NOT NULL,
  department_id INT NOT NULL, 
  PRIMARY KEY (id),
  FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employees (
	id INT NOT NULL AUTO_INCREMENT, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INT NOT NULL, 
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY(manager_id) REFERENCES employees(id),
    FOREIGN KEY(role_id) REFERENCES role(id)
);

/*! Seeded Files
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("MADE", "UP", 1,2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Captain", "Anonymous", 3, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("ChillinB", "Chill", 5, 6);

INSERT INTO department (name) 
VALUES ("Sales"), ("Legal"), ("Finance"), ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1), 
       ('Salesperson', 60000, 1),    
	   ('Lawyer', 190000, 2),
	   ('Legal Team Lead', 250000, 2),
	   ('Accountant', 125000, 3),
	   ('Software Engineer', 120000, 4),
	   ('Lead Software Engineer', 180000, 4);
*/





