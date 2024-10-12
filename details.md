## Create 3 Standard queues to process this
- EmailQueue
- InventoryQueue
- PaymentQueue


## Create 3 lambda functions
- PaymentServiceLambda
- InventoryServiceLambda
- EmailServiceLambda

## Assign lambda execution role to necessory permisions using policy statements to invoke lambda functions
PaymentServiceLambda's execution role
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Action": [
				"sqs:ReceiveMessage",
				"sqs:GetQueueAttributes",
				"sqs:DeleteMessage",
				"sqs:SendMessage"
			],
			"Resource": [
				"arn:aws:sqs:us-east-1:992382749865:PaymentQueue",
				"arn:aws:sqs:us-east-1:992382749865:InventoryQueue"
			]
		}
	]
}

InventoryServiceLambda's executions role
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "Statement1",
			"Effect": "Allow",
			"Action": [
				"sqs:GetQueueAttributes",
				"sqs:DeleteMessage",
				"sqs:ReceiveMessage",
				"sqs:SendMessage"
			],
			"Resource": [
				"arn:aws:sqs:us-east-1:992382749865:InventoryQueue",
				"arn:aws:sqs:us-east-1:992382749865:EmailQueue"
			]
		}
	]
}

EmailServiceLambda's executions role
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "Statement1",
			"Effect": "Allow",
			"Action": [
				"sqs:GetQueueAttributes",
				"sqs:ReceiveMessage",
				"sqs:DeleteMessage"
			],
			"Resource": "arn:aws:sqs:us-east-1:992382749865:EmailQueue"
		}
	]
}
