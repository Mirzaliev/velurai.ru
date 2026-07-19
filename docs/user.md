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

### Роли внутри платформы (таблица `UserPlatformAccess`)

- `user` — пользователь платформы
- `admin` — администратор конкретной платформы

Пока платформа одна (`teacher`), роли платформы не критичны, но заложены для масштабирования.

## Таблицы

### `User`

Поля better-auth по умолчанию + кастомные:

| Поле            | Тип       | Описание                                      |
| --------------- | --------- | --------------------------------------------- |
| `id`            | String    | CUID                                          |
| `email`         | String    | Уникальный email                              |
| `emailVerified` | Boolean   | Подтверждён ли email (пока не используется)   |
| `name`          | String?   | Имя пользователя, опционально                 |
| `image`         | String?   | Аватар, опционально                           |
| `role`          | UserRole  | Глобальная роль: `user` или `admin`           |
| `createdAt`     | DateTime  | Дата создания                                 |
| `updatedAt`     | DateTime  | Дата обновления                               |

Связи:
- `sessions` → `Session[]`
- `accounts` → `Account[]`
- `platformAccess` → `UserPlatformAccess[]`

### `Session`

Сессии better-auth:

| Поле        | Тип      | Описание           |
| ----------- | -------- | ------------------ |
| `id`        | String   | CUID               |
| `userId`    | String   | Ссылка на User     |
| `token`     | String   | Уникальный токен   |
| `expiresAt` | DateTime | Срок действия      |
| `ipAddress` | String?  | IP адрес           |
| `userAgent` | String?  | User-Agent         |
| `createdAt` | DateTime | Дата создания      |
| `updatedAt` | DateTime | Дата обновления    |

### `Account`

OAuth-аккаунты и credentials better-auth:

| Поле                    | Тип       | Описание                       |
| ----------------------- | --------- | ------------------------------ |
| `id`                    | String    | CUID                           |
| `userId`                | String    | Ссылка на User                 |
| `accountId`             | String    | ID аккаунта у провайдера       |
| `providerId`            | String    | ID провайдера (yandex и т.д.)  |
| `accessToken`           | String?   | Access token                   |
| `refreshToken`          | String?   | Refresh token                  |
| `idToken`               | String?   | ID token                       |
| `accessTokenExpiresAt`  | DateTime? | Срок access token              |
| `refreshTokenExpiresAt` | DateTime? | Срок refresh token             |
| `scope`                 | String?   | OAuth scope                    |
| `password`              | String?   | Хеш пароля (для email/password)|
| `createdAt`             | DateTime  | Дата создания                  |
| `updatedAt`             | DateTime  | Дата обновления                |

### `Verification`

Коды верификации better-auth:

| Поле         | Тип      | Описание                |
| ------------ | -------- | ----------------------- |
| `id`         | String   | CUID                    |
| `identifier` | String   | Идентификатор           |
| `value`      | String   | Код/токен               |
| `expiresAt`  | DateTime | Срок действия           |
| `createdAt`  | DateTime | Дата создания           |
| `updatedAt`  | DateTime | Дата обновления         |

### `Platform`

Платформы продукта:

| Поле       | Тип      | Описание                  |
| ---------- | -------- | ------------------------- |
| `id`       | String   | CUID                      |
| `slug`     | String   | Уникальный slug в URL     |
| `name`     | String   | Название платформы        |
| `isActive` | Boolean  | Активна ли платформа      |
| `createdAt`| DateTime | Дата создания             |
| `updatedAt`| DateTime | Дата обновления           |

Сейчас seed-запись: `slug = "teacher"`, `name = "AI для преподавателей"`.

### `UserPlatformAccess`

Связь пользователя с платформой:

| Поле         | Тип                 | Описание                       |
| ------------ | ------------------- | ------------------------------ |
| `id`         | String              | CUID                           |
| `userId`     | String              | Ссылка на User                 |
| `platformId` | String              | Ссылка на Platform             |
| `role`       | PlatformMemberRole  | Роль в платформе               |
| `createdAt`  | DateTime            | Дата создания                  |
| `updatedAt`  | DateTime            | Дата обновления                |

Уникальный индекс по `(userId, platformId)`.

## Поток авторизации

1. Пользователь открывает `/sign-in` или `/sign-up`.
2. Вводит email + пароль или авторизуется через Yandex.
3. better-auth создаёт/обновляет `User`, `Account`, `Session`.
4. Middleware проверяет наличие сессионной cookie.
5. Серверные компоненты через `requireAuth()` / `requirePlatformAccess()` / `requireAdmin()` проверяют права.
6. После успешного входа пользователь попадает на `/teacher`.

## Защита маршрутов

### Middleware

- Пропускает публичные маршруты: `/`, `/sign-in`, `/sign-up`, `/api/auth/*`.
- Для остальных проверяет наличие сессионной cookie.
- При отсутствии cookie редиректит на `/sign-in`.
- Определяет slug платформы из пути и передаёт в заголовок `x-platform-slug`.

### Server helpers

- `getSession()` — получить текущую сессию.
- `requireAuth()` — требовать авторизацию, иначе редирект на `/sign-in`.
- `requireAdmin()` — требовать глобальную роль `admin`.
- `requirePlatformAccess(slug)` — требовать доступ к платформе.

## Файлы

- `prisma/schema.prisma` — схема БД
- `prisma/seed.ts` — seed платформы `teacher`
- `src/lib/prisma.ts` — singleton PrismaClient
- `src/lib/auth.ts` — конфигурация better-auth
- `src/lib/auth/helpers.ts` — server helpers для проверки прав
- `src/app/api/auth/[...all]/route.ts` — единый API-роут better-auth
- `src/middleware.ts` — проверка сессии на уровне middleware
