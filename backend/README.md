# Geri60+ Saúde API

API Spring Boot 3.4 + Java 21 para o domínio de cuidado diário. O banco de desenvolvimento é PostgreSQL 16 e o versionamento de schema é feito com Flyway.

## Desenvolvimento local

```bash
docker compose up -d postgres
mvn spring-boot:run
```

Variáveis disponíveis: `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`, `APP_CORS_ORIGINS` e `PORT`.

Endpoints iniciais: `GET /api/health`, `GET/POST /api/elders`, `GET/POST /api/elders/{elderId}/medications`, `GET /api/elders/{elderId}/activities` e `GET /api/elders/{elderId}/appointments`. A camada de autenticação está preparada para os papéis `ADMIN`, `FAMILY` e `CAREGIVER`; a próxima etapa deve conectar login, JWT e permissões por `elder_access`.
