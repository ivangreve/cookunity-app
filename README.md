# cookunity-app

A full stack app with NestJs + ReactJs for CookUnity Challenge
The aplication was deployed in the following sites:
api: https://cookunity-app-production.up.railway.app/api (swagger doc)
front: https://cookunity-app.vercel.app/

You can Register as a new User (CHEF or CUSTOMER) or use an already created user

{
// CHEF User
email: donato@cookunity.com
password: chef
}

{
// Customer User
email: ivangreve@gmail.com
password: user
}

# Docker 🐋

### Run all services:

cd cookunity-app
docker-compose up

This command run 3 services
Engine: engine_service
DB: mongodb_service
Frontend: frontend_service

### Run only one services:

You can up services separately too
docker-compose up 'SERVICE_NAME'

i.e.: docker-compose up 'mongodb_service'

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
