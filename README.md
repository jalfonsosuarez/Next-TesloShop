# TESLO-SHOP un e-comerce profsional del curso de Next de Fernando Herrera

```
https://www.udemy.com/course/nextjs-fh/
```

# Ejecutar en DEV

- Tener Docker instalado `https://www.docker.com/`
- Clonar el repositorio
- Instalar dependencia con `npm install`
- Copiar `.env.template` como `.env`
- Establecer los valores para las variables de entorno
  - IMPORTANTE: para el valor de AUTH_SECRET, generarlo con `openssl rand -base64 32`
- Levantar la base de datos con Docker `docker compose up -d`
- Ejecutar migraciones de Prisma `npx prisma migrate dev`
- Cargar datos de prueba en la base de datos `npm run seed`
- Ejecutar el proyecto `npm run dev`

- Ver base de datos con `npx prisma studio`

# Generar y ejecutar en PROD
