# NestJS Hexagonal Skeleton

Este repositorio es un esqueleto (starter) que muestra cómo organizar una aplicación Node/NestJS siguiendo la arquitectura hexagonal (Ports & Adapters). Está pensado para ser un punto de partida claro, con ejemplos mínimos de una entidad `User`, un caso de uso, adaptadores de persistencia (en memoria y TypeORM) y un controlador HTTP.

**Estructura principal**
- `src/domain`: Entidades, objetos de valor y puertos (interfaces de repositorio).
- `src/application`: Casos de uso (la lógica de la aplicación, independiente de infraestructuras).
- `src/infrastructure`: Adaptadores concretos (HTTP controllers, persistencia, mappers).
- `src/shared`: DTOs y utilidades compartidas.

Por qué esta organización:
- La **capa de dominio** contiene las reglas empresariales (entidades, interfaces). Debe ser independiente de frameworks.
- La **capa de aplicación** implementa casos de uso; orquesta entidades y puertos.
- La **capa de infraestructura** contiene adaptadores que implementan los puertos (ej. repositorios TypeORM, controladores HTTP).

Beneficios:
- Independencia de la base de datos o framework (puedes cambiar TypeORM por Prisma, por ejemplo).
- Pruebas más sencillas: los casos de uso se pueden probar con repositorios en memoria.
- Mejor separación de responsabilidades y mantenibilidad.

Instalación y ejecución

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar en desarrollo:

```bash
npm run start:dev
```

3. Acceder a la API y documentación:
- API base: `http://localhost:3000/api`
- Swagger (OpenAPI): `http://localhost:3000/api/docs`

Docker

- Construir y ejecutar (modo producción):

```bash
docker build -t nestjs-hexagonal .
docker run -p 3000:3000 nestjs-hexagonal
```

- Desarrollo con `docker-compose` (usa bind mounts para recargar código):

```bash
docker-compose up --build
```

Tests

```bash
npm run test
```

Cómo está implementado el almacenamiento

- `src/infrastructure/adapters/persistence/in-memory-user.repository.ts`: repositorio en memoria, útil para pruebas y desarrollo rápido.
- `src/infrastructure/adapters/persistence/typeorm-user.repository.ts`: adaptador que usa TypeORM y SQLite por defecto (configurado en `AppModule`).

Cambiar a Postgres (opcional)

1. Modifica la configuración de TypeORM en `src/app.module.ts` (o usa `ormconfig` / variables de entorno`):
	- `type: 'postgres'`
	- añade `host`, `port`, `username`, `password`, `database`
2. Añade `pg` a las dependencias:

```bash
npm install pg
```

Recomendaciones de proyectos / librerías

- Framework: **NestJS** — arquitectura modular y excelentes integraciones.
- ORM/DB: **TypeORM** para prototipos y proyectos convencionales; **Prisma** para un ergonomía y rendimiento mejorados.
- Base de datos: **Postgres** en producción; **SQLite** para desarrollo y tests rápidos.
- Documentación API: **@nestjs/swagger** + **Swagger UI** (ya incluido).
- Validación/transformación: **class-validator** y **class-transformer** para DTOs.
- Testing: **Jest** con `@nestjs/testing`.
- Contenerización: **Docker** + `docker-compose`.

Buenas prácticas y siguientes pasos

- Añadir DTOs con validaciones (`class-validator`) y mapearlos a entidades de dominio con mappers.
- Usar inyección de dependencias por puerto (ya se hace con el token `UserRepository`).
- Añadir logging estructurado y manejo de errores global.
- Agregar CI (GitHub Actions) para ejecutar tests y lint en PRs.
- Considere extraer un módulo `config` que cargue variables desde `process.env` y permita cambiar fácilmente entre SQLite/Postgres.

Enlaces útiles

- NestJS: https://nestjs.com
- TypeORM: https://typeorm.io
- Prisma: https://www.prisma.io
- Swagger/Nest: https://docs.nestjs.com/openapi/introduction

Si quieres, puedo:
- añadir `class-validator` a los DTOs y mostrar ejemplos;
- cambiar `docker-compose.yml` para incluir un contenedor Postgres;
- crear un pipeline básico de GitHub Actions.

---
Archivo de inicio: [src/main.ts](src/main.ts)
Caso de uso ejemplo: [src/application/use-cases/create-user.usecase.ts](src/application/use-cases/create-user.usecase.ts)
Controlador: [src/infrastructure/http/controllers/user.controller.ts](src/infrastructure/http/controllers/user.controller.ts)
