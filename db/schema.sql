CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE departments (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL
);

USE employeeTracker_db;

CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  deparment_id INT NOT NULL
  FOREIGN KEY (deparment_id) REFERENCES (deparment_id)
);

USE employeeTracker_db;

CREATE TABLE employees (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT
);