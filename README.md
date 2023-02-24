# cookunity-app

A full stack app with NestJs + ReactJs for CookUnity Challenge

# Docker

## All App

cd cookunity-app
docker-compose up

## MongoDb

cd cookunity-app
docker-compose up mongo_db_service

## NestJs

cd cookunity-app
docker-compose up engine_service

Login
/auth/login

## Seed Data

yarn nestjs-command create:user

{
"email": "chef@cookunity.com",
"password": "chef"
}
or
{
"email": "customer@cookunity.com",
"password": "customer"
}
