#!/usr/bin/env bash

###############################################################################
## DB Up Script
###############################################################################

started_at=$(date +"%s")

echo "-----> Provisioning containers <-----"
cd ./docker/ || exit
docker-compose up -d

echo "-----> Building project <-----"
npm run build

echo "-----> Running migrations <-----"
npm run typeorm:run

echo "-----> Running seeds <-----"
npm run typeorm:seed

ended_at=$(date +"%s")

minutes=$((((ended_at - started_at) / 60)))
seconds=$((((ended_at - started_at) % 60)))

echo "-----> Done in ${minutes}m${seconds}s <-----"
