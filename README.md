# 🍝 Cookunity 🥘

###### 🎉This proyect is a full app with NestJs + ReactJs for CookUnity challenge! 🎉

- The aplication was deployed in the following sites:
  **backend**: `https://cookunity-app-production.up.railway.app/api` (swagger doc)
  **front**: `https://cookunity-app.vercel.app/`

###### You can Register as a new User (CHEF or CUSTOMER) or use an already created userYou can Register as a new User (CHEF or CUSTOMER) or use an already created user

## Seed User ✨

- Go to api folder: `cd api`
- Run the following script: `yarn nestjs-command create:user`

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

## # Docker knowledge 🐋 🧠

Run all services:
`docker-compose up`

If do you want run only one service run:
`docker-compose up <serviceName>`

Example:

- **DataBase service:** `docker-compose up mongodb_service`
- **Engine service:** `docker-compose up engine_service`
- **Frontend service:** `docker-compose up frontend_service`

## Used Technologies/Tools 🪛

- [.NestJs](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [React](https://react.com/)
- [ViteJs](https://vitejs.dev/)
- [Mui](https://mui.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Docker](https://docker.com/)
- [SwaggerUI](https://swagger.io/)
- [Json Web Token](https://jwt.io/)
