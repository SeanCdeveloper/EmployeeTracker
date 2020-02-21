DROP DATABASE IF EXISTS EmployeeTrackerDB;

CREATE database EmployeeTrackerDB;

USE EmployeeTrackerDB;

CREATE TABLE department (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE role (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES role(id)
);

USE EmployeeTrackerDB;

INSERT into department (name) VALUES ("Sales");
INSERT into department (name) VALUES ("Legal");
INSERT into department (name) VALUES ("Finance");
INSERT into department (name) VALUES ("Engineering");

INSERT into role (title, salary, department_id) VALUES ("Sales Lead", 100000, 1);
INSERT into role (title, salary, department_id) VALUES ("Sales Person", 50000, 1);
INSERT into role (title, salary, department_id) VALUES ("Lawyer", 100000, 2);
INSERT into role (title, salary, department_id) VALUES ("Legal Team Lead", 900000, 2);
INSERT into role (title, salary, department_id) VALUES ("Accountant", 100000, 3);
INSERT into role (title, salary, department_id) VALUES ("Financial Advisor", 30000, 3);
INSERT into role (title, salary, department_id) VALUES ("Dev Ops", 80000, 4);
INSERT into role (title, salary, department_id) VALUES ("Programmer", 80000, 4);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("DOM", "Nodes", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("John", "MadeUP", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Chris", "Random", 2, 1);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Albert", "E", 3, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Doe", 4, 4);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Jane", "Doe", 4, 7);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Boss", "Man", 5, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("AJAX", "Ross", 6, 4);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Array", 7, 7);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Galileo", "Dylan", 7, 4);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Arrays", "Johnson", 8, 7);
