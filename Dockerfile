# Etapa 1: Construcción del proyecto Angular
FROM node:20 AS build

WORKDIR /app

# Copiar archivos necesarios e instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar todo el código fuente y compilar en modo producción
COPY . .
RUN npm run build --configuration=production --project=gestion_laboratorios

# Etapa 2: Servir el frontend con Nginx
FROM nginx:stable-alpine

# Copiar los archivos generados de Angular a la raíz de Nginx
COPY --from=build /app/dist/gestion-laboratorios/browser /usr/share/nginx/html


# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Comando para mantener Nginx corriendo
CMD ["nginx", "-g", "daemon off;"]
