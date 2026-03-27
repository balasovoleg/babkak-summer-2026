# 🔧 Исправление ошибки "Failed to fetch"

## ❌ Ошибка

```
Error saving month data for may: TypeError: Failed to fetch
```

## 🔍 Причина

Эта ошибка означает, что фронтенд не может подключиться к серверу Supabase Edge Function.

**Возможные причины:**
1. ✅ Сервер не запущен локально
2. ✅ Неправильные переменные окружения
3. ✅ CORS проблема
4. ✅ Неправильный URL сервера

---

## ✅ Решение 1: Запустить сервер локально

### Если используете локальный Supabase:

```bash
# В отдельном терминале запустите Supabase CLI
supabase start

# Затем запустите Edge Function
supabase functions serve

# В другом терминале запустите фронтенд
npm run dev
```

---

## ✅ Решение 2: Проверить переменные окружения

### Проверьте файл `/utils/supabase/info.tsx`:

```typescript
export const projectId = "your-project-id";
export const publicAnonKey = "your-anon-key";
```

### Значения должны быть:

**Локальный Supabase:**
- `projectId`: обычно что-то вроде `localhost:54321` или ID из `supabase status`
- `publicAnonKey`: anon key из `supabase status`

**Production Supabase:**
- `projectId`: ваш реальный project ID (например, `abcdefghijklmno`)
- `publicAnonKey`: anon key из Supabase Dashboard

---

## ✅ Решение 3: URL сервера

### Текущий URL:

```javascript
const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-86e83646`;
```

### Для локального сервера измените на:

```javascript
const API_URL = `http://localhost:54321/functions/v1/make-server-86e83646`;
```

**Где изменить:**
- `/src/app/context/MonthDataContext.tsx` (строка 21)
- `/src/app/hooks/useMonthData.ts` (строка 8)
- `/src/app/App.tsx` (если есть прямые вызовы)
- Все компоненты, использующие API

---

## ✅ Решение 4: Проверить сервер

### 1. Health Check

Откройте в браузере:
```
https://YOUR-PROJECT.supabase.co/functions/v1/make-server-86e83646/health
```

Или локально:
```
http://localhost:54321/functions/v1/make-server-86e83646/health
```

**Должен вернуть:**
```json
{"status":"ok"}
```

### 2. Если не работает:

**Проверьте логи сервера:**
```bash
supabase functions logs --tail make-server-86e83646
```

**Или в Production:**
Supabase Dashboard → Edge Functions → Logs

---

## ✅ Решение 5: Работа без сервера (временно)

Если сервер недоступен, приложение будет работать **локально** без синхронизации:

- ✅ Данные сохраняются в памяти браузера
- ✅ UI работает нормально
- ❌ Нет синхронизации между пользователями
- ❌ Данные исчезают при перезагрузке страницы

**Это нормально для разработки!**

---

## ✅ Решение 6: Отладка подробно

### Шаг 1: Откройте DevTools (F12)

### Шаг 2: Перейдите на вкладку **Console**

### Шаг 3: Попробуйте изменить данные (добавить событие)

### Шаг 4: Смотрите логи:

**Успешное сохранение:**
```
Saving data for may: { items: 5, noteLength: 0 }
Attempting to save to: https://...
✓ Saved data for may: { success: true }
```

**Ошибка:**
```
Saving data for may: { items: 5, noteLength: 0 }
Attempting to save to: https://...
Error saving month data for may: TypeError: Failed to fetch
Error message: Failed to fetch
```

### Шаг 5: Перейдите на вкладку **Network**

- Найдите запрос к `/month/may`
- Посмотрите статус (красный = ошибка)
- Проверьте Headers, Response

---

## ✅ Решение 7: CORS (если сервер работает)

Если сервер отвечает, но CORS блокирует:

### Проверьте `/supabase/functions/server/index.tsx`:

```typescript
app.use(
  "/*",
  cors({
    origin: "*", // Разрешить все (для разработки)
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);
```

### Для production измените `origin`:

```typescript
origin: "https://your-actual-domain.com",
```

---

## 🎯 Быстрая проверка

### 1. Сервер запущен?

```bash
curl http://localhost:54321/functions/v1/make-server-86e83646/health
# Или
curl https://YOUR-PROJECT.supabase.co/functions/v1/make-server-86e83646/health
```

**Ожидаем:** `{"status":"ok"}`

### 2. Переменные правильные?

```bash
cat utils/supabase/info.tsx
```

Проверьте `projectId` и `publicAnonKey`

### 3. URL правильный?

```bash
grep "API_URL" src/app/hooks/useMonthData.ts
grep "API_URL" src/app/context/MonthDataContext.tsx
```

Должно быть:
- Локально: `http://localhost:54321/...`
- Production: `https://PROJECT-ID.supabase.co/...`

---

## 💡 Рекомендации

### Для локальной разработки:

1. ✅ Используйте `supabase start` + `supabase functions serve`
2. ✅ URL: `http://localhost:54321/...`
3. ✅ Следите за логами: `supabase functions logs --tail`

### Для production:

1. ✅ Деплой функции: `supabase functions deploy`
2. ✅ URL: `https://PROJECT-ID.supabase.co/...`
3. ✅ Проверьте Dashboard → Edge Functions → Logs

### Если сервер не нужен сейчас:

Просто игнорируйте ошибку! Приложение работает локально. 😊

---

## 🎉 После исправления

Вы должны увидеть в консоли:

```
Saving data for may: { items: 5, noteLength: 0 }
Attempting to save to: http://localhost:54321/functions/v1/make-server-86e83646/month/may
✓ Saved data for may: { success: true }
```

И в логах сервера:

```
✓ Saved may: 5 items, note: 0 chars
```

---

## 📞 Нужна помощь?

### Шаг 1: Соберите информацию

```bash
# 1. Версия Supabase CLI
supabase --version

# 2. Статус сервисов
supabase status

# 3. Логи функции
supabase functions logs make-server-86e83646 --limit 50
```

### Шаг 2: Проверьте консоль браузера

F12 → Console → скопируйте все ошибки

### Шаг 3: Проверьте Network

F12 → Network → найдите запрос `/month/may` → скопируйте детали

---

**Made with 💜 for Babkak Summer 2026**

P.S. Ошибка "Failed to fetch" не критична для разработки - приложение работает локально! 🌸
