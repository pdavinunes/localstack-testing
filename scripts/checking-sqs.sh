#!/bin/bash

aws --endpoint-url=http://localhost:4566 sqs get-queue-attributes \
  --queue-url http://localhost:4566/000000000000/my-queue \
  --attribute-names All