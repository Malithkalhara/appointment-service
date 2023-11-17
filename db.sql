CREATE TABLE appointment.users (
    id serial PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(20) NOT null,
    role VARCHAR(255) DEFAULT 'user'
);

-- Create the Customers table
CREATE TABLE appointment.customers (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    mobile_no TEXT NOT NULL,
    email TEXT
);

-- Create the Items table
CREATE TABLE appointment.services (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    details TEXT,
    price NUMERIC(10, 2) NOT NULL,
    type TEXT
);

-- Create the Appointments table
CREATE TABLE appointment.appointments (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    details TEXT,
    customer_id UUID NOT NULL REFERENCES Customers(id),
    item_ids UUID[],
    appointment_date DATE NOT NULL,
    appointment_time TIME,
    time_duration INTERVAL
);



-- Create the Bills table
CREATE TABLE appointment.billing (
    id UUID PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES Customers(id),
    item_ids UUID[],
    amount NUMERIC(10, 2) NOT NULL,
    appointment_id UUID REFERENCES Appointments(id),
    status TEXT,
    date TIMESTAMP NOT NULL;
);
