const mysql = require('mysql2/promise');
const AWS = require('aws-sdk');
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const sqs = new AWS.SQS();

exports.handler = async (event) => {
    for (const record of event.Records) {
        let body = JSON.parse(record.body);
        const orderId = body.orderId;

        // Simulate payment processing
        let res = await db.query('UPDATE orders SET email_sent = ? WHERE order_id = ?', ['1', orderId]);
     
    }
    return {
        statusCode: 200,
        body: JSON.stringify('Payment processed successfully.')
    };
};
