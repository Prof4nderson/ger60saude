# Geri60+ Saúde em Docker na VPS

O stack usa três containers numa rede privada: `frontend` (Nginx, publicado em `3021`), `api` (Spring Boot, somente na rede Docker em `8080`) e `db` (PostgreSQL, sem porta pública).

## Primeira subida

```bash
cd /opt/geri60saude
cp .env.vps.example .env
nano .env

docker compose -f docker-compose.vps.yml up -d --build
docker compose -f docker-compose.vps.yml ps
curl http://127.0.0.1:3021/
```

O arquivo `.env` precisa ter uma senha forte em `POSTGRES_PASSWORD`. Não publique o PostgreSQL nem a porta 8080 no firewall. O acesso externo da aplicação é `http://IP_DA_VPS:3021`.

## Atualizar depois de um git pull

```bash
git pull origin main
docker compose -f docker-compose.vps.yml up -d --build
docker image prune -f
docker compose -f docker-compose.vps.yml logs -f --tail=100
```

## Diagnóstico

```bash
docker compose -f docker-compose.vps.yml ps
docker compose -f docker-compose.vps.yml logs api --tail=100
docker compose -f docker-compose.vps.yml logs frontend --tail=100
curl http://127.0.0.1:3021/api/health
```

## HTTPS

Para domínio e TLS, mantenha o container na porta 3021 e coloque um Nginx ou Caddy externo em 80/443 fazendo proxy para `127.0.0.1:3021`. Se esse proxy estiver no mesmo host, remova a publicação pública do container e troque `3021:3021` por `127.0.0.1:3021:3021` no compose.
