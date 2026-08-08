-- AI-Powered Disaster Relief Management System

-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Disasters Table
CREATE TABLE disasters (
    disaster_id SERIAL PRIMARY KEY,
    disaster_type VARCHAR(100) NOT NULL,
    location VARCHAR(200) NOT NULL,
    severity VARCHAR(50),
    description TEXT,
    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reported_by INT REFERENCES users(user_id)
);

-- Volunteers Table
CREATE TABLE volunteers (
    volunteer_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    skill VARCHAR(100),
    availability BOOLEAN DEFAULT TRUE
);

-- Resources Table
CREATE TABLE resources (
    resource_id SERIAL PRIMARY KEY,
    resource_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    resource_type VARCHAR(50),
    disaster_id INT REFERENCES disasters(disaster_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Relief Camps Table
CREATE TABLE relief_camps (
    camp_id SERIAL PRIMARY KEY,
    camp_name VARCHAR(100) NOT NULL,
    location VARCHAR(200) NOT NULL,
    capacity INT NOT NULL,
    available_slots INT NOT NULL,
    disaster_id INT REFERENCES disasters(disaster_id)
);

-- Tasks Table
CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    task_name VARCHAR(100) NOT NULL,
    task_description TEXT,
    volunteer_id INT REFERENCES volunteers(volunteer_id),
    disaster_id INT REFERENCES disasters(disaster_id),
    status VARCHAR(50) DEFAULT 'Pending'
);

-- Notifications Table
CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    message TEXT NOT NULL,
    notification_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'Unread'
);