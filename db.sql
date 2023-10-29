CREATE TABLE appointments.users (
    id serial PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(20) NOT null,
    role VARCHAR(255) DEFAULT 'user'
);

-- Create the Customers table
CREATE TABLE appointments.customers (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    mobile_no TEXT NOT NULL,
    email TEXT
);

-- Create the Items table
CREATE TABLE appointments.items (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    details TEXT,
    price NUMERIC(10, 2) NOT NULL,
    type TEXT
);

-- Create the Appointments table
CREATE TABLE appointments.appointments (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    details TEXT,
    customer_id UUID NOT NULL REFERENCES Customers(id),
    item_ids UUID[]
);

-- Create the Bills table
CREATE TABLE appointments.bills (
    id UUID PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES Customers(id),
    item_ids UUID[],
    amount NUMERIC(10, 2) NOT NULL,
    appointment_id UUID REFERENCES Appointments(id),
    status TEXT
);
