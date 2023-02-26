# Configuración de la imagen base
FROM node:16-alpine

# Establece el directorio de trabajo de la aplicación dentro del contenedor
WORKDIR /app

# Copia los archivos de la aplicación en el contenedor
COPY . .

# Instala las dependencias necesarias para construir la aplicación
RUN yarn install --frozen-lockfile

# Construye la aplicación para producción
RUN yarn build

# Expone el puerto 5173 en el contenedor
EXPOSE 5173

# Start the server using the production build
CMD ["yarn", "run", "dev"]
