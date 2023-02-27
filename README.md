# 🍝 Cookunity 🥘

## Table of Contents
- **Introduction** 📖
- **Demo app** 🍽️🎉
- **Getting Started** ✨
- **Tests** 🧪⚗️
- **Docker** 🐋
- **Technologies/Tools** 🪛


## Introduction 📖
#### 🎉This project is a full-stack web application built with **NestJS** and **ReactJS** for the CookUnity challenge! 🎉


## Demo app 🍽️🎉
- The application has been deployed in the following sites:

**Backend:** [https://cookunity-app-production.up.railway.app/api](https://cookunity-app-production.up.railway.app/api "https://cookunity-app-production.up.railway.app/api") (Swagger doc).

**Frontend:** [https://cookunity-app.vercel.app/](https://cookunity-app.vercel.app/ "https://cookunity-app.vercel.app/").

## Getting Started ✨

To use the application, you can register as a new user or use the seed user provided below. To create the seeds users, navigate to the **api** folder and run the following command:

```bash
cd api
yarn nestjs-command create:user
```

```json
[
  {
    "name": "Donato de Santis",
    "email": "donato@cookunity.com",
    "role": "CHEF",
    "password": "chef",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpYeiftn_mBq8eomPq1_TB4Eb0MiPKkpEHIhW9obEvrVZO0vlU"
  },
  {
    "name": "Christophe Krywonis",
    "email": "christophe@cookunity.com",
    "role": "CHEF",
    "password": "chef",
    "image": "https://aptus.com.ar/wp-content/uploads/2018/10/christophe-masterchef3.jpg"
  },
  {
    "name": "Ivan Greve",
    "email": "ivangreve@gmail.com",
    "role": "CUSTOMER",
    "password": "1234",
    "image": "https://ivangreve.com/profile.jpg"
  }
]
```

## Tests 🧪⚗️
To run test for the aplications:

**Backend:** `yarn test`

**Frontend:** `yarn test`

## Docker 🐋🧠
To run the application using Docker, follow these steps:
1. **Go** to the root folder of the project.
2. **Run** the following command to start all the services:

```bash
docker-compose up
```

- If you want to run only one service, run the following command, replacing `<serviceName>` with the name of the service you want to start:

```bash
docker-compose up <serviceName>
```

*Example:*
- **DataBase service:** `docker-compose up mongodb_service`
- **Engine service:** `docker-compose up engine_service`
- **Frontend service:** `docker-compose up frontend_service`

## Technologies/Tools 🪛

- [.NestJs](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [React](https://react.com/)
- [ViteJs](https://vitejs.dev/)
- [Mui](https://mui.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Testing Library](https://testing-library.com/)
- [Docker](https://docker.com/)
- [SwaggerUI](https://swagger.io/)
- [Json Web Token](https://jwt.io/)
