#!/bin/bash

aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name my-queue

aws --endpoint-url=http://localhost:4566 dynamodb create-table \
    --table-name MyTable \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
