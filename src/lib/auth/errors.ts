export type AuthError = {
  message?: string;
  code?: string;
  status?: number;
};

const ERROR_MESSAGES: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "Неверный email или пароль.",
  USER_NOT_FOUND: "Пользователь с таким email не найден.",
  INVALID_PASSWORD: "Некорректный пароль.",
  INVALID_EMAIL: "Некорректный email.",
  EMAIL_NOT_VERIFIED: "Email не подтверждён.",
  USER_ALREADY_EXISTS: "Пользователь с таким email уже существует.",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
    "Пользователь с таким email уже существует. Используйте другой email.",
  PASSWORD_TOO_SHORT: "Пароль слишком короткий.",
  PASSWORD_TOO_LONG: "Пароль слишком длинный.",
  CREDENTIAL_ACCOUNT_NOT_FOUND: "Аккаунт с паролем не найден.",
  PROVIDER_NOT_FOUND: "OAuth-провайдер не найден.",
  FAILED_TO_GET_USER_INFO: "Не удалось получить данные пользователя от провайдера.",
  INVALID_OAUTH_CONFIGURATION: "Некорректная конфигурация OAuth.",
  PROVIDER_CONFIG_NOT_FOUND: "Конфигурация провайдера не найдена.",
  PROVIDER_ID_REQUIRED: "Не указан провайдер авторизации.",
  INVALID_OAUTH_CONFIG: "Некорректная OAuth-конфигурация.",
  SESSION_REQUIRED: "Требуется авторизация.",
  INVALID_REDIRECT_URL: "Некорректный адрес перенаправления.",
  INVALID_CALLBACK_URL: "Некорректный callback URL.",
  MISSING_FIELD: "Обязательное поле не заполнено.",
  VALIDATION_ERROR: "Ошибка валидации данных.",
};

export function getAuthErrorMessage(error: AuthError | null | undefined): string {
  if (!error) return "";

  if (error.code && ERROR_MESSAGES[error.code]) {
    return ERROR_MESSAGES[error.code];
  }

  if (error.message) {
    const normalized = error.message.toLowerCase();
    if (normalized.includes("invalid email or password")) {
      return ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD;
    }
    if (normalized.includes("user already exists")) {
      return ERROR_MESSAGES.USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL;
    }
    if (normalized.includes("user not found")) {
      return ERROR_MESSAGES.USER_NOT_FOUND;
    }
    if (normalized.includes("password too short")) {
      return ERROR_MESSAGES.PASSWORD_TOO_SHORT;
    }
    return error.message;
  }

  return "Произошла неизвестная ошибка. Попробуйте ещё раз.";
}

export function validateAuthEmail(email: string): string | null {
  if (!email.trim()) return "Введите email.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Введите корректный email.";
  return null;
}

export function validateAuthPassword(password: string): string | null {
  if (!password) return "Введите пароль.";
  if (password.length < 8) return "Пароль должен содержать не менее 8 символов.";
  return null;
}
