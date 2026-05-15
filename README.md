# NestJS API Skeleton with Auth and Hexagonal Architecture

Esqueleto base para construir APIs con NestJS usando autenticación JWT, PostgreSQL, Swagger, Docker y una arquitectura hexagonal modular.

Este proyecto no busca ser una API final cerrada, sino un punto de partida mantenible y escalable para desarrollar nuevos contextos de negocio sobre una base limpia.

## Arquitectura

```text
src/
  contexts/
    auth/
      application/
      domain/
      infrastructure/
  shared/
    infrastructure/
```

## Por qué esta arquitectura

Se utiliza una arquitectura hexagonal y modular para separar el negocio de los detalles técnicos de infraestructura.

- **Dominio independiente:** las reglas principales viven en `domain` y no dependen de frameworks, bases de datos ni HTTP.
- **Casos de uso claros:** `application` orquesta las acciones del sistema, como registrar usuarios, iniciar sesión u obtener el usuario autenticado.
- **Infraestructura reemplazable:** `infrastructure` contiene adaptadores concretos como TypeORM, JWT, bcrypt, controladores HTTP y guards.
- **Bajo acoplamiento:** las dependencias se conectan mediante puertos e interfaces, facilitando cambiar PostgreSQL, JWT u otros adaptadores sin romper el dominio.
- **Escalabilidad modular:** nuevos contextos pueden agregarse bajo `src/contexts`, manteniendo cada módulo aislado y organizado.
- **Facilidad para pruebas:** al separar casos de uso y puertos, es más sencillo probar lógica de aplicación sin depender de Docker, base de datos o servicios externos.

La estructura propuesta permite que la API crezca sin mezclar responsabilidades entre controladores, entidades, servicios de infraestructura y reglas de negocio.

## Qué incluye este esqueleto

- Autenticación con JWT.
- Registro y login de usuarios.
- Endpoint protegido para obtener el usuario autenticado.
- Persistencia con PostgreSQL y TypeORM.
- Hash de contraseñas con bcrypt.
- Documentación interactiva con Swagger.
- Docker y Docker Compose para despliegue local.
- Pipeline de GitHub Actions para lint, tests y build.

## Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/docs`

## Ejecutar con Docker

```bash
cp .env.example .env
docker compose up --build
```

Swagger estará disponible en:

```text
http://localhost:3000/api/docs
```

## Ejecutar localmente

```bash
cp .env.example .env
npm install
npm run start:dev
```

Para ejecución local sin Docker, cambia `DB_HOST=localhost` en `.env`.

## Variables de entorno

```text
NODE_ENV=development
PORT=3000
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=auth_db
DB_SYNCHRONIZE=true
JWT_SECRET=change_me_in_production
JWT_EXPIRES_IN=1h
```

## CI

El pipeline de GitHub Actions ejecuta:

- Instalación de dependencias
- Lint
- Tests
- Build
- PostgreSQL como servicio para pruebas
