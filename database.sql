CREATE SCHEMA `sqs-test` ;
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100),
    order_status VARCHAR(50),
    payment_status VARCHAR(50),
    inventory_status VARCHAR(50),
    email_sent BOOLEAN DEFAULT FALSE
);

CREATE TABLE order_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    message VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);