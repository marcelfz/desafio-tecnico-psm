# 🌿 RDSMBN — Portal de Notícias

[![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

O **RDSMBN** é uma plataforma Full Stack voltada para a publicação e gerenciamento de notícias da Reserva de Desenvolvimento Sustentável de Barra Nova. Conta com um painel administrativo completo com autenticação, editor de texto rico e upload de imagens, além de um feed público responsivo para a comunidade.

> Desenvolvido como desafio técnico para a Prefeitura de São Mateus.

---

## 🚀 Funcionalidades

### 📰 Feed Público
- Grid responsivo de notícias com imagem de capa, título e descrição
- Busca em tempo real por título
- Paginação
- Página de detalhe com conteúdo formatado (acessada via slug)

### 🛠️ Painel Administrativo
- Autenticação com Laravel Sanctum
- CRUD completo de notícias (criar, visualizar, editar, excluir)
- Editor de texto rico sem dependências externas
- Upload de imagem de capa com substituição automática
- Modal de confirmação antes de excluir
- Busca e paginação no painel

---

## 📂 Estrutura do Projeto

```text
📂 desafio-tecnico-psm
├── 📂 backend                        # API RESTful em Laravel 12
│   ├── 📂 app
│   │   ├── 📂 Http
│   │   │   ├── 📂 Controllers        # AuthController, NewsController
│   │   │   └── 📂 Requests           # StoreNewsRequest, UpdateNewsRequest
│   │   └── 📂 Models                 # News (UUID, slug automático)
│   ├── 📂 database
│   │   ├── 📂 migrations
│   │   ├── 📂 factories              # NewsFactory
│   │   └── 📂 seeders                # NewsSeeder, DatabaseSeeder
│   ├── 📂 config
│   │   └── cors.php
│   └── 📂 routes
│       └── api.php
│
└── 📂 frontend                       # Aplicação Next.js 16 (App Router)
    ├── 📂 app
    │   ├── page.tsx                  # Feed público
    │   ├── 📂 noticias/[slug]        # Detalhe público (por slug)
    │   ├── 📂 login                  # Tela de login
    │   └── 📂 admin                  # Painel administrativo
    │       ├── page.tsx              # Dashboard (listagem)
    │       ├── 📂 news/new           # Criar notícia
    │       ├── 📂 news/[uuid]        # Visualizar notícia
    │       └── 📂 news/[uuid]/edit   # Editar notícia
    ├── 📂 components
    │   ├── 📂 home                   # HomeNav, HomeHeader, NewsGrid, Pagination
    │   ├── 📂 admin                  # NewsTable, NewsSearchBar, DeleteModal, AdminPagination
    │   ├── NewsForm.tsx              # Formulário compartilhado criar/editar
    │   └── RichTextEditor.tsx        # Editor rich text sem bibliotecas externas
    ├── 📂 types
    │   └── news.ts                   # Interfaces TypeScript
    └── proxy.ts                      # Proteção de rotas /admin
```

---

## 🛠️ Pré-requisitos

- PHP 8.2 ou superior
- Composer
- Node.js 18.x ou superior
- npm ou pnpm
- MySQL (XAMPP, Laragon ou Docker)

---

## ⚙️ Configuração e Execução

### Backend (Laravel)

Dentro da pasta `backend`, siga as instruções:

1. Instale as dependências:
```bash
    composer install
```

2. Crie o arquivo de variáveis de ambiente:
```bash
    cp .env.example .env
```

3. Configure as credenciais do banco no `.env`:
```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=nome_do_banco
    DB_USERNAME=seu_usuario
    DB_PASSWORD=sua_senha
```

4. Crie o banco de dados com o mesmo nome definido em `DB_DATABASE`.

5. Gere a chave da aplicação:
```bash
    php artisan key:generate
```

6. Crie o link simbólico para o storage (imagens de capa):
```bash
    php artisan storage:link
```

7. Rode as migrations com os seeders:
```bash
    php artisan migrate --seed
```
    Caso já tenha rodado antes, use:
```bash
    php artisan migrate:fresh --seed
```

8. Inicie o servidor:
```bash
    php artisan serve
```
    O backend estará disponível em `http://127.0.0.1:8000`.

---

### Frontend (Next.js)

Dentro da pasta `frontend`, siga as instruções:

1. Instale as dependências:
```bash
    npm install
```

2. Crie o arquivo de variáveis de ambiente:
```bash
    cp .env.local.example .env.local
```

3. Configure a URL da API no `.env.local`:
```env
    NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Inicie o servidor:
```bash
    npm run dev
```
    O frontend estará disponível em `http://localhost:3000`.

---

## 🔐 Acesso ao Painel

Após rodar os seeders, um usuário de teste é criado automaticamente:

| Campo | Valor |
|---|---|
| Email | `test@example.com` |
| Senha | `password` |

Acesse o painel em `http://localhost:3000/login`.

---

Desenvolvido por Marcelo.
