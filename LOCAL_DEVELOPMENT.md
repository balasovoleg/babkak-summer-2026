# 🛠️ Локальная разработка и сборка проекта

## ⚠️ Важно: figma:asset в локальной среде

Этот проект создан в **Figma Make** и использует специальную схему импорта `figma:asset` для изображений, которая работает только в среде Figma Make.

### Проблема

При локальной сборке через `pnpm build` или `npm build` возникает ошибка:

```
[vite]: Rollup failed to resolve import "figma:asset/..."
```

### Решение

В `vite.config.ts` добавлен специальный плагин `figmaAssetPlugin()`, который:

1. Перехватывает импорты с префиксом `figma:asset/`
2. Заменяет их на placeholder изображения (прозрачный 1x1 PNG)
3. Позволяет проекту успешно собираться локально

### Как это работает

```typescript
// В Figma Make (работает):
import photo from "figma:asset/abc123.png";

// В локальной сборке (через плагин):
// → заменяется на data:image/png;base64,...
```

---

## ⚠️ Ошибка: Capacitor Push Notifications несовместимость

### Проблема

При сборке iOS в Xcode появляются ошибки:

```
Value of type 'PluginConfig' has no member 'getArray'
Type 'JSTypes' has no member 'coerceDictionaryToJSObject'
```

### Причина

Несовместимость версий пакетов Capacitor.

### Решение

Убедитесь что все пакеты Capacitor имеют одинаковую версию **8.3.0**:

```json
"@capacitor/cli": "^8.3.0",
"@capacitor/core": "^8.3.0",
"@capacitor/ios": "^8.3.0",
"@capacitor/push-notifications": "^8.3.0"
```

Если версии разные — обновите:

```bash
pnpm update @capacitor/push-notifications
pnpm install
```

---

## 🚀 Команды для локальной разработки

### Установка зависимостей

```bash
pnpm install
# или
npm install
```

### Разработка (dev server)

```bash
pnpm dev
# или
npm run dev
```

Откроется на `http://localhost:5173`

### Сборка для production

```bash
pnpm build
# или
npm run build
```

Результат в папке `dist/`

### Предпросмотр production сборки

```bash
pnpm preview
# или
npm run preview
```

---

## 📱 iOS разработка с Capacitor

### Первоначальная настройка

```bash
# Установите зависимости
pnpm install

# Соберите web приложение
pnpm build

# Добавьте iOS платформу (только первый раз)
pnpm exec cap add ios

# Синхронизируйте
pnpm exec cap sync ios

# Откройте Xcode
pnpm exec cap open ios
```

### После изменений в коде

```bash
# 1. Соберите web
pnpm build

# 2. Синхронизируйте с iOS
pnpm exec cap sync ios

# 3. В Xcode нажмите Run (Cmd+R)
```

---

## 🖼️ Замена placeholder изображений

Если нужны реальные изображения вместо placeholder'ов:

### Вариант A: Использовать Unsplash

Замените импорты в компонентах:

```typescript
// Было:
import photo from "figma:asset/abc123.png";

// Стало:
const photo = "https://images.unsplash.com/photo-...?w=800&q=80";
```

### Вариант B: Локальные изображения

1. Создайте папку `/public/images/`
2. Поместите туда изображения
3. Замените импорты:

```typescript
// Было:
import photo from "figma:asset/abc123.png";

// Стало:
const photo = "/images/summer-photo.jpg";
```

### Вариант C: Используйте ImageWithFallback

```typescript
import { ImageWithFallback } from './components/figma/ImageWithFallback';

<ImageWithFallback 
  src="https://images.unsplash.com/photo-..."
  alt="Summer photo"
  className="w-full h-64 object-cover"
/>
```

---

## 🔧 Структура проекта

```
babkak-summer-2026/
├── src/
│   ├── app/
│   │   ├── App.tsx              # Главный компонент
│   │   ├── routes.tsx           # React Router
│   │   ├── components/          # Все компоненты
│   │   ├── pages/              # Страницы месяцев
│   │   └── hooks/              # React хуки
│   ├── styles/                 # CSS стили
│   └── imports/                # Импортированные ассеты
├── public/
│   ├── manifest.json           # PWA манифест
│   ├── sw.js                   # Service Worker
│   └── icons/                  # Иконки приложения
├── ios/                        # Capacitor iOS проект
├── supabase/                   # Backend
├── vite.config.ts              # Vite конфигурация + figmaAssetPlugin
├── capacitor.config.ts         # Capacitor конфигурация
└── package.json
```

---

## 📦 Основные технологии

- **React 18** — UI фреймворк
- **TypeScript** — типизация
- **React Router** — навигация
- **Tailwind CSS v4** — стилизация
- **Vite** — сборщик
- **Capacitor** — нативная интеграция iOS
- **Supabase** — backend (database + storage + auth)
- **PWA** — прогрессивное веб-приложение

---

## 🐛 Решение проблем

### Ошибка: "node: not found"

```bash
# Установите Node.js
brew install node

# Проверьте
node --version
```

### Ошибка: "figma:asset cannot be resolved"

✅ Уже решено через плагин в `vite.config.ts`

### Ошибка: Capacitor не синхронизируется

```bash
# Пересоберите и синхронизируйте
pnpm build
pnpm exec cap sync ios
```

### Белый экран в iOS симуляторе

```bash
# Очистите и пересоберите
rm -rf dist ios
pnpm build
pnpm exec cap add ios
pnpm exec cap sync ios
pnpm exec cap open ios
```

---

## 🌐 Работа с GitHub

### Клонирование проекта

```bash
git clone https://github.com/balasovoleg/babkak-summer-2026.git
cd babkak-summer-2026
pnpm install
pnpm build
pnpm exec cap add ios
pnpm exec cap open ios
```

### Отправка изменений

```bash
git add .
git commit -m "Описание изменений"
git push origin main
```

---

## ✅ Checklist для нового разработчика

- [ ] Node.js установлен (v18+)
- [ ] pnpm установлен (`npm install -g pnpm`)
- [ ] Xcode установлен (для iOS)
- [ ] Репозиторий клонирован
- [ ] `pnpm install` выполнен
- [ ] `pnpm build` успешно завершился
- [ ] iOS платформа добавлена (`pnpm exec cap add ios`)
- [ ] Проект открывается в Xcode
- [ ] Приложение запускается в симуляторе

---

## 📞 Полезные ссылки

- **Capacitor Docs:** https://capacitorjs.com/docs
- **React Router:** https://reactrouter.com
- **Vite:** https://vitejs.dev
- **Supabase:** https://supabase.com/docs
- **Tailwind CSS v4:** https://tailwindcss.com

---

## 💡 Примечание

Для **полного функционала** рекомендуется работать в среде **Figma Make**, где:
- ✅ `figma:asset` импорты работают нативно
- ✅ Горячая перезагрузка
- ✅ Все фичи доступны без дополнительной настройки

Локальная разработка подходит для:
- ✅ iOS/Android разработки через Capacitor
- ✅ Добавления нативных фич
- ✅ Тестирования на реальных устройствах
- ✅ Подготовки к публикации в App Store

---

**Удачной разработки! 🚀**