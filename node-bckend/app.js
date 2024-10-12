require('dotenv').config();
const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = '1';
const mysql = require('mysql2/promise');
const app = express();
app.use(cors());
app.use(express.json());
const sqs = new AWS.SQS({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// DB connection
const db = mysql.createPool({
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE
});

app.use(express.json());

// Place order API
app.post('/place-order', async (req, res) => {
    const { customerName } = req.body;

    // Insert order into DB
    const [result] = await db.query('INSERT INTO orders (customer_name, order_status, payment_status, inventory_status) VALUES (?, ?, ?, ?)',
        [customerName, 'pending', 'pending', 'pending']);
    const orderId = result.insertId;

    // Push message to SQS for order processing
    const message = {
        MessageBody: JSON.stringify({ orderId, customerName }),
        QueueUrl: process.env.SQS_PAYMENT_QUEUE_URL
    };
    await sqs.sendMessage(message).promise();

    res.json({ message: 'Order placed successfully', orderId });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
