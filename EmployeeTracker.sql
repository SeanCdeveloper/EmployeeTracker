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


 




