CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL
);

USE employees_db;

CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  deparments_id INT NOT NULL
  FOREIGN KEY (deparments_id) REFERENCES deparments(id)
);

USE employees_db;

CREATE TABLE employees (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
);