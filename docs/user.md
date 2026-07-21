# Схема пользователя и авторизации Velurai

## Общие принципы

- Единый аккаунт для всех платформ.
- Регистрация идентична входу: только email + пароль.
- Имя пользователя необязательно.
- Подтверждение email пока отключено, но поле `emailVerified` оставлено для будущего включения.
- Magic link не используется.
- OAuth через Yandex (Telegram — позже).

## Способы входа

1. **Email + пароль**
2. **Yandex OAuth** — через generic-oauth плагин better-auth. Требует `YANDEX_CLIENT_ID` и `YANDEX_CLIENT_SECRET` в `.env`.

## Роли

### Глобальные роли (таблица `User`)

- `user` — обычный пользователь
- `admin` — глобальный администратор Velurai

Глобальные роли определяют доступ к разделам приложения:

| Маршрут    | Требуемая роль     | Описание                    |
| ---------- | ------------------ | --------------------------- |
| `/app/*`   | `user` или `admin` | Личный кабинет пользователя |
| `/admin/*` | `admin`            | Административная панель     |
| остальные  | —                  | Публичные страницы          |

### Роли внутри платформы

Таблицы `Platform` и `UserPlatformAccess` остаются в схеме БД, но в текущей версии не используются для контроля доступа. Пользователю предлагаются разные варианты продукта в рамках единого аккаунта, а не изолированные платформы.

## Таблицы

### `User`

Поля better-auth по умолчанию + кастомные:

| Поле            | Тип      | Описание                                    |
| --------------- | -------- | ------------------------------------------- |
| `id`            | String   | CUID                                        |
| `email`         | String   | Уникальный email                            |
| `emailVerified` | Boolean  | Подтверждён ли email (пока не используется) |
| `name`          | String?  | Имя пользователя, опционально               |
| `image`         | String?  | Аватар, опционально                         |
| `role`          | UserRole | Глобальная роль: `user` или `admin`         |
| `createdAt`     | DateTime | Дата создания                               |
| `updatedAt`     | DateTime | Дата обновления                             |

Связи:

- `sessions` → `Session[]`
- `accounts` → `Account[]`
- `platformAccess` → `UserPlatformAccess[]`

### `Session`

Сессии better-auth:

| Поле        | Тип      | Описание         |
| ----------- | -------- | ---------------- |
| `id`        | String   | CUID             |
| `userId`    | String   | Ссылка на User   |
| `token`     | String   | Уникальный токен |
| `expiresAt` | DateTime | Срок действия    |
| `ipAddress` | String?  | IP адрес         |
| `userAgent` | String?  | User-Agent       |
| `createdAt` | DateTime | Дата создания    |
| `updatedAt` | DateTime | Дата обновления  |

### `Account`

OAuth-аккаунты и credentials better-auth:

| Поле                    | Тип       | Описание                        |
| ----------------------- | --------- | ------------------------------- |
| `id`                    | String    | CUID                            |
| `userId`                | String    | Ссылка на User                  |
| `accountId`             | String    | ID аккаунта у провайдера        |
| `providerId`            | String    | ID провайдера (yandex и т.д.)   |
| `accessToken`           | String?   | Access token                    |
| `refreshToken`          | String?   | Refresh token                   |
| `idToken`               | String?   | ID token                        |
| `accessTokenExpiresAt`  | DateTime? | Срок access token               |
| `refreshTokenExpiresAt` | DateTime? | Срок refresh token              |
| `scope`                 | String?   | OAuth scope                     |
| `password`              | String?   | Хеш пароля (для email/password) |
| `createdAt`             | DateTime  | Дата создания                   |
| `updatedAt`             | DateTime  | Дата обновления                 |

### `Verification`

Коды верификации better-auth:

| Поле         | Тип      | Описание        |
| ------------ | -------- | --------------- |
| `id`         | String   | CUID            |
| `identifier` | String   | Идентификатор   |
| `value`      | String   | Код/токен       |
| `expiresAt`  | DateTime | Срок действия   |
| `createdAt`  | DateTime | Дата создания   |
| `updatedAt`  | DateTime | Дата обновления |

### `Platform`

Платформы продукта:

| Поле        | Тип      | Описание              |
| ----------- | -------- | --------------------- |
| `id`        | String   | CUID                  |
| `slug`      | String   | Уникальный slug в URL |
| `name`      | String   | Название платформы    |
| `isActive`  | Boolean  | Активна ли платформа  |
| `createdAt` | DateTime | Дата создания         |
| `updatedAt` | DateTime | Дата обновления       |

Сейчас seed-запись: `slug = "teacher"`, `name = "AI для преподавателей"`.

### `UserPlatformAccess`

Связь пользователя с платформой:

| Поле         | Тип                | Описание           |
| ------------ | ------------------ | ------------------ |
| `id`         | String             | CUID               |
| `userId`     | String             | Ссылка на User     |
| `platformId` | String             | Ссылка на Platform |
| `role`       | PlatformMemberRole | Роль в платформе   |
| `createdAt`  | DateTime           | Дата создания      |
| `updatedAt`  | DateTime           | Дата обновления    |

Уникальный индекс по `(userId, platformId)`.

## Поток авторизации

1. Пользователь открывает `/login` или `/register`.
2. Вводит email + пароль или авторизуется через Yandex.
3. better-auth создаёт/обновляет `User`, `Account`, `Session`.
4. Proxy (`src/proxy.ts`) проверяет наличие сессионной cookie для защищённых маршрутов.
5. Серверные компоненты через `requireRole()` / `requireAdmin()` проверяют роль.
6. После успешного входа пользователь попадает на `/app`.

## Защита маршрутов

### Proxy (`src/proxy.ts`)

- Проверяет авторизацию на уровне маршрута.
- Публичные маршруты: `/`, `/login`, `/register`, `/api/auth/*`.
- Защищённые маршруты: `/app/*` и `/admin/*`.
- При отсутствии сессионной cookie редиректит на `/login?callbackUrl=...`.
- Все остальные страницы доступны без авторизации.

### Server helpers

- `getSession()` — получить текущую сессию.
- `requireAuth()` — требовать авторизацию, иначе редирект на `/login`.
- `requireRole(roles)` — требовать одну из указанных глобальных ролей.
- `requireAdmin()` — требовать глобальную роль `admin`.

## Файлы

- `prisma/schema.prisma` — схема БД
- `prisma/seed.ts` — seed платформы `teacher`
- `src/lib/prisma.ts` — singleton PrismaClient
- `src/lib/auth.ts` — конфигурация better-auth
- `src/lib/auth/helpers.ts` — server helpers для проверки прав
- `src/app/api/auth/[...all]/route.ts` — единый API-роут better-auth
- `src/proxy.ts` — проверка сессии на уровне proxy (бывший middleware)
