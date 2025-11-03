-- Crear base de datos
CREATE DATABASE IF NOT EXISTS UserDB;

use UserDB;

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);