# WEB2 — восстановленный проект

Стек: Node.js + Express + SQLite + React/Vite.

## 1. Backend
Открой терминал в корне `WEB2_recreated`:

```bash
npm install
node index.js
```

Если PowerShell блокирует `npm.ps1`, используй:

```bash
npm.cmd install
node index.js
```

Backend: http://localhost:3001

## 2. Frontend
Во втором терминале:

```bash
cd vite-project
npm install
npm run dev
```

или в PowerShell с ограничением:

```bash
cd vite-project
npm.cmd install
npm.cmd run dev
```

Frontend: http://localhost:5173

## 3. Первый запуск
1. Открой `/register` и зарегистрируй пользователя.
2. Войди через `/login`.
3. После входа доступны пользователи, кассы, контрагенты, типы операций и кассовые операции.

## Структура API
- POST `/auth/register`
- POST `/auth/login`
- GET/PUT/DELETE `/users`
- CRUD `/cashboxes`
- CRUD `/counterparties`
- CRUD `/operation-types`
- CRUD `/cash-operations`

Защищенные маршруты требуют JWT в `Authorization: Bearer <token>`.
