# Geri60+ Saúde

Aplicação web de cuidado diário para familiares e cuidadores de idosos. A primeira entrega transforma os requisitos do TCC em um dashboard responsivo com foco em medicamentos, agenda, rotina, hidratação, diário e acessibilidade.

## Stack

- Frontend: Vite, React, TypeScript, TanStack Router, TanStack Query e Nitro.
- Backend: Spring Boot 3.4, Java 21, Spring Web, Spring Data JPA, Spring Security, Flyway e PostgreSQL 16.
- UX: modo claro Holo e modo escuro Cyber, layout responsivo, controle de fonte e leitura em voz alta.

## Rodar o frontend

```bash
pnpm install
pnpm dev
```

O frontend inicia na porta 3021 por padrão. A porta pode ser sobrescrita com `FRONT_PORT=3030 pnpm dev`. O Preview inclui dados demonstrativos para navegação e persiste tema, tamanho de fonte e idoso selecionado no navegador.

## Rodar a API

```bash
cd backend
docker compose up -d postgres
mvn spring-boot:run
```

A API usa `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`, `APP_CORS_ORIGINS` e `PORT`. O schema inicial está em `backend/src/main/resources/db/migration/V1__initial_schema.sql`.

## Rotas principais

`/` painel, `/saude` gestão médica, `/rotina` cuidados físicos, `/agenda` agenda compartilhada, `/diario` diário do cuidador e `/configuracoes` acessibilidade e temas.

## Observação de escopo

O Preview atual é um MVP demonstrável com dados locais e contratos de API preparados. A próxima iteração deve conectar os formulários à API, implementar login/JWT e permissões por usuário, auditoria persistente, backup e atualizações em tempo real.

## Deploy em VPS

As configurações de produção estão em [`deploy/README.md`](/home/ubuntu/geri60saude/deploy/README.md). No Docker da VPS, o frontend escuta internamente na porta `80` e é publicado em `127.0.0.1:3027`; o Nginx do domínio encaminha para `127.0.0.1:3027` e o `/api` segue para o Spring Boot em `8080`.

Para subir tudo em Docker na VPS, copie `.env.vps.example` para `.env` e execute `docker compose -f docker-compose.vps.yml up -d --build`. O domínio HTTPS previsto é `https://geri60saude.professor-anderson.com`; o guia completo está em [`deploy/docker/README.md`](/home/ubuntu/geri60saude/deploy/docker/README.md) e [`deploy/README.md`](/home/ubuntu/geri60saude/deploy/README.md).
