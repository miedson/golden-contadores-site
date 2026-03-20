# Golden Contadores Site

Projeto Next.js institucional da Golden Contadores.

## Uso

```bash
pnpm install
pnpm dev
```

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## SEO

O projeto já sai com:

- metadados completos para Google e redes sociais
- `robots.txt` e `sitemap.xml`
- `manifest.webmanifest`
- dados estruturados `JSON-LD` para serviço contábil

Para produção, defina:

```bash
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com.br
```

## Deploy com Coolify

Arquivos adicionados para deploy:

- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`

No Coolify, basta apontar para este repositório e usar o `docker-compose.yml`.

Se quiser subir manualmente:

```bash
docker compose up -d --build
```
