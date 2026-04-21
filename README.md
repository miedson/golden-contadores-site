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
pnpm reviews:ensure
pnpm reviews:sync
```

## Reviews do Google

As avaliações exibidas no site são lidas de um arquivo JSON local.

- arquivo de runtime: `data/google-reviews.json`
- arquivo seed: `data/google-reviews.seed.json`
- script de sincronização: `google-reviews.ts`

Variáveis esperadas:

```bash
cp .env.example .env.local
```

Observações:

- a rotina usa OAuth 2.0 com scope `https://www.googleapis.com/auth/business.manage`
- você pode informar `GOOGLE_BUSINESS_ACCOUNT_NAME` e `GOOGLE_BUSINESS_LOCATION_NAME` em vez dos IDs
- se houver apenas uma conta e um local acessíveis pelo token, o script também tenta resolver isso automaticamente
- o worker consulta a API uma vez por dia e mantém o último JSON salvo como cache local

Teste local:

```bash
pnpm install
pnpm reviews:ensure
pnpm reviews:sync
pnpm dev
```

Se a chamada da API falhar, o site continua usando o último JSON salvo.

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
- `docker-compose.yaml`
- `.dockerignore`

O compose sobe dois serviços:

- `golden-contadores-site`: aplicação Next.js
- `golden-contadores-reviews-sync`: rotina diária de atualização das avaliações

Ambos compartilham um volume interno com o JSON de reviews.

Boas práticas para produção:

- cadastre `GOOGLE_BUSINESS_CLIENT_SECRET` e `GOOGLE_BUSINESS_REFRESH_TOKEN` como secrets/envs no Coolify, nunca em arquivos `.env*` no repositório
- em caso de falha no sync, o worker registra o erro e tenta novamente após 10 minutos
- o JSON compartilhado contém apenas avaliações públicas; as credenciais ficam restritas ao serviço de sincronização

Defina no Coolify:

```bash
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com.br
SITE_PORT=3006
GOOGLE_PLACE_NAME=Golden Contadores
GOOGLE_REVIEWS_TARGET_COUNT=24
GOOGLE_BUSINESS_ACCOUNT_ID=123456789012345678901
GOOGLE_BUSINESS_LOCATION_ID=9876543210987654321
GOOGLE_BUSINESS_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GOOGLE_BUSINESS_CLIENT_SECRET=seu-client-secret
GOOGLE_BUSINESS_REFRESH_TOKEN=seu-refresh-token
```

O sync roda uma vez a cada 24h dentro do container worker.

Se o sync falhar, o worker registra o erro e tenta novamente após 10 minutos, evitando loop agressivo de restart.

Se quiser subir manualmente:

```bash
docker compose up -d --build
```
