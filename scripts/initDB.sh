#!/usr/bin/env bash

###############################################################################
## Init DB Script
###############################################################################

started_at=$(date +"%s")

echo "-----> Provisioning containers <-----"

cd ./docker
docker-compose up -d

echo ""

#web=$(docker-compose ps | grep boilerplate-api-dev | awk '{print $1}')

# Run TypeORM migrations.
#echo "-----> Running application migrations <-----"

#cd ..

#npm run typeorm:migrations
#echo ""

ended_at=$(date +"%s")

minutes=$((((ended_at - started_at) / 60)))
seconds=$((((ended_at - started_at) % 60)))

echo "-----> Done in ${minutes}m${seconds}s <-----"
