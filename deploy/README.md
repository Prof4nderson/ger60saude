# Deploy em VPS

Esta configuração expõe o frontend estático do Geri60+ Saúde na porta `3021` e encaminha `/api/*` para o Spring Boot na porta `8080`.

## 1. Pacotes e usuário

```bash
sudo apt update
sudo apt install -y nginx postgresql rsync curl
sudo adduser --system --group --home /opt/geri60saude geri60
sudo mkdir -p /opt/geri60saude /var/www/geri60saude
sudo chown -R geri60:geri60 /opt/geri60saude
```

Instale Node.js 20+ e pnpm 10+ na VPS. Copie o repositório para `/opt/geri60saude`, gere o jar com `mvn -DskipTests package` dentro de `backend/` e prepare o PostgreSQL conforme `backend/docker-compose.yml` ou sua instalação gerenciada.

## 2. Frontend em 3021

```bash
cd /opt/geri60saude
pnpm install --frozen-lockfile
pnpm typecheck
pnpm build
sudo rsync -a --delete dist/ /var/www/geri60saude/dist/
sudo chown -R www-data:www-data /var/www/geri60saude
```

O Vite e o `vite preview` também usam `3021` por padrão. Para desenvolvimento, é possível sobrescrever com `FRONT_PORT=3030 pnpm dev`; em produção, o Nginx serve `dist` diretamente.

## 3. Nginx e symlink (`ln`)

```bash
sudo cp deploy/nginx/geri60saude.conf /etc/nginx/sites-available/geri60saude.conf
sudo ln -sfn /etc/nginx/sites-available/geri60saude.conf /etc/nginx/sites-enabled/geri60saude.conf
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl enable --now nginx
sudo systemctl reload nginx
```

Acesse `http://IP_DA_VPS:3021`. Se existir firewall UFW, libere a porta com `sudo ufw allow 3021/tcp`. Para HTTPS com domínio, troque `server_name _` pelo domínio, adicione os certificados e redirecione 80 para 443; a aplicação continua internamente no mesmo root e proxy.

## Subdomínio e Certbot

Crie no DNS um registro `A` para `geri60saude.professor-anderson.com` apontando para o IP público da VPS. Se houver IPv6, crie também um registro `AAAA`; caso contrário, remova qualquer `AAAA` incorreto para não quebrar a validação.

Para o stack Docker, mantenha o container publicado como `127.0.0.1:3027:80` e use o Nginx do host como proxy HTTPS para o domínio:

```bash
sudo apt install -y nginx certbot python3-certbot-nginx
sudo mkdir -p /var/www/certbot

sudo cp deploy/nginx/geri60saude-subdomain-bootstrap.conf \
  /etc/nginx/sites-available/geri60saude.professor-anderson.com.conf
sudo ln -sfn \
  /etc/nginx/sites-available/geri60saude.professor-anderson.com.conf \
  /etc/nginx/sites-enabled/geri60saude.professor-anderson.com.conf
sudo nginx -t
sudo systemctl reload nginx

sudo certbot certonly --webroot -w /var/www/certbot \
  -d geri60saude.professor-anderson.com \
  --agree-tos --no-eff-email \
  -m seu-email@example.com

sudo cp deploy/nginx/geri60saude-subdomain.conf \
  /etc/nginx/sites-available/geri60saude.professor-anderson.com.conf
sudo nginx -t
sudo systemctl reload nginx
sudo certbot renew --dry-run
```

Libere somente HTTP/HTTPS no firewall quando usar o domínio: `sudo ufw allow 80/tcp`, `sudo ufw allow 443/tcp`. A porta externa `3027` fica no loopback e não precisa ser liberada publicamente. O Certbot instala/usa o timer de renovação automática; o `certbot renew --dry-run` valida o fluxo.

## 4. Backend como serviço

```bash
sudo cp deploy/env/backend.env.example /etc/geri60saude/backend.env
sudo chmod 600 /etc/geri60saude/backend.env
sudo cp deploy/systemd/geri60saude-api.service /etc/systemd/system/geri60saude-api.service
sudo systemctl daemon-reload
sudo systemctl enable --now geri60saude-api
sudo systemctl status geri60saude-api
curl http://127.0.0.1:8080/api/health
```

Depois, o frontend usa `/api` no mesmo host e o Nginx encaminha a requisição para o serviço Java. Não exponha a porta `8080` publicamente; mantenha-a apenas no loopback ou na rede privada.

## Atualizações futuras

```bash
cd /opt/geri60saude
git pull origin main
bash deploy/deploy-vps.sh
cd backend && mvn -DskipTests package
sudo systemctl restart geri60saude-api
```
