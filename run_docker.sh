#!/bin/bash

docker run -d --name CloudServer \
	-v $(pwd)/locationConfig.json:/usr/src/app/locationConfig.json \
	-e S3DATA=multiple \
	-e ENDPOINT=http://localhost \
	-p 8000:8000 \
	shfranc/data-janitor:multicloud2
