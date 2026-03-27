# 🌸 Summer 2026 — Interactive Memories & Checklist

![Version](https://img.shields.io/badge/Version-43.0.0-success)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![Capacitor](https://img.shields.io/badge/Capacitor-6.2.0-119EFF?logo=capacitor)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![iOS](https://img.shields.io/badge/iOS-Ready-000000?logo=apple)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)

Интерактивная презентация-чеклист событий, путешествий и активностей с мая по сентябрь 2026 года в современной Pinterest-эстетике с glassmorphism дизайном.

---

## 🚀 Version 43.0.0 — Quick Start

### 📦 Деплой в GitHub (5 минут)
```bash
git init && git branch -M main
git remote add origin https://github.com/your-username/babkak-summer-2026.git
git add . && git commit -m "Release v43.0.0: Stable build without push notifications"
git tag -a v43.0.0 -m "Version 43.0.0"
git push -u origin main && git push origin v43.0.0
```

### 🍎 Сборка в Xcode (10 минут)
```bash
npm install && npm run build && npm run cap:sync && npm run cap:open:ios
```

> **📖 Подробная инструкция:** [START_HERE_V43.md](START_HERE_V43.md) | [QUICK_DEPLOY_V43.md](QUICK_DEPLOY_V43.md)

---

## ⚠️ Важное изменение v43

**Push-уведомления намеренно удалены** из-за неразрешимых конфликтов зависимостей.  
Все остальные функции работают в полном объеме.

**Подробности:** [RELEASE_NOTES_V43.md](RELEASE_NOTES_V43.md) | [VERSION_HISTORY.md](VERSION_HISTORY.md)

---

## ✨ Возможности

### 📱 PWA & Native iOS
- ✅ Progressive Web App с офлайн-режимом
- ✅ Нативное iOS приложение через Capacitor
- ✅ Установка на Home Screen
- ✅ Service Worker для кэширования
- ⚠️ Push-уведомления намеренно отключены (v43+)

### 🎨 Современный дизайн
- ✅ Glassmorphism эффекты
- ✅ Градиенты purple→pink→blue
- ✅ Пастельная цветовая палитра для каждого месяца
- ✅ Плавные анимации Motion
- ✅ Адаптивная верстка для desktop/mobile

### 📸 Медиа-галерея
- ✅ До 30 фото/видео на каждый месяц
- ✅ Автоматическая синхронизация через Supabase Storage
- ✅ Locket-стиль видж��т со случайными фото
- ✅ Rewind страница со всеми воспоминаниями

### 🎵 Музыкальное сопровождение
- ✅ Фоновая музыка для всего приложения
- ✅ Песня месяца для каждого периода
- ✅ Загрузка через удобный интерфейс

### ✅ Интерактивные чеклисты
- ✅ Синхронизация в реальном времени
- ✅ Общие чеклисты для всех пользователей
- ✅ Заметки для каждого месяца
- ✅ Сохранение в Supabase

---

## 🚀 Быстрый старт

### Веб-версия (PWA)

```bash
# Установите зависимости
npm install

# Запустите dev-сервер
npm run dev

# Откройте в браузере
# http://localhost:5173
```

### iOS приложение (Xcode)

```bash
# 1. Установите зависимости
npm install

# 2. Соберите проект
npm run build

# 3. Добавьте iOS платформу
npx cap add ios

# 4. Откройте в Xcode
npm run cap:open:ios
```

**Подробные инструкции:** См. [README_XCODE.md](README_XCODE.md)

---

## 📚 Документация

- 📱 [README_XCODE.md](README_XCODE.md) — Быстрый старт для Xcode
- 🔧 [CAPACITOR_IOS_SETUP.md](CAPACITOR_IOS_SETUP.md) — Полная настройка iOS
- 🎨 [IOS_WIDGET_GUIDE.md](IOS_WIDGET_GUIDE.md) — Гайд по созданию виджетов
- 📦 [GIT_REPOSITORY_GUIDE.md](GIT_REPOSITORY_GUIDE.md) — Работа с Git

---

## 🛠 Технологии

### Frontend
- **React 18.3.1** — UI библиотека
- **TypeScript** — Типизация
- **Tailwind CSS 4** — Стилизация
- **Motion** — Анимации
- **React Router 7** — Маршрутизация

### Mobile
- **Capacitor 8** — Native wrapper
- **Push Notifications** — Уведомления
- **iOS/Android** — Нативные платформы

### Backend
- **Supabase** — База данных и хранилище
- **Edge Functions** — Serverless API
- **Storage** — Файловое хранилище

### Инструменты
- **Vite 6** — Сборщик
- **PWA** — Service Worker
- **Lucide React** — Иконки

---

## 📁 Структура проекта

```
summer-2026/
├── src/
│   ├── app/
│   │   ├── components/      # React компоненты
│   │   ├── pages/           # Страницы месяцев
│   │   ├── hooks/           # Кастомные хуки
│   │   ├── context/         # Context API
│   │   └── routes.tsx       # Маршруты
│   ├── styles/              # CSS стили
│   └── imports/             # Импортированные ассеты
├── public/
│   ├── sw.js               # Service Worker
│   ├── manifest.json       # PWA манифест
│   └── icons/              # Иконки приложения
├── supabase/
│   └── functions/          # Edge Functions
├── capacitor.config.ts     # Конфиг Capacitor
└── package.json            # Зависимости
```

---

## 🎯 Основные компоненты

### Страницы месяцев
- **Cover.tsx** — Главная страница
- **May.tsx** — Май (зелёный)
- **June.tsx** — Июнь (голубой)
- **July.tsx** — Июль (оранжевый)
- **August.tsx** — Август (розовый)
- **September.tsx** — Сентябрь (золотой)

### Специальные страницы
- **Rewind.tsx** — Все воспоминания
- **LocketWidget.tsx** — Случайные фото

### Компоненты
- **MediaGallery** — Галерея фото/видео
- **MonthSong** — Песня месяца
- **Settings** — Настройки с Push
- **InstallButton** — PWA установка
- **BackgroundMusic** — Фоновая музыка

---

## 📱 Скриншоты

*(Добавьте скриншоты вашего приложения)*

---

## 🔔 Push-уведомления

### Настройка для iOS:

1. Откройте проект в Xcode
2. Signing & Capabilities → **+ Capability** → **Push Notifications**
3. Настройте App ID на [developer.apple.com](https://developer.apple.com)
4. Создайте APNs сертификаты
5. Протестируйте на реальном устройстве

**Подробнее:** [CAPACITOR_IOS_SETUP.md](CAPACITOR_IOS_SETUP.md#-настройка-push-уведомлений-в-xcode)

---

## 🎨 Цветовая палитра

| Месяц | Основной цвет | RGB |
|-------|---------------|-----|
| Май | Зелёный | `#86efac` |
| Июнь | Голубой | `#7dd3fc` |
| Июль | Оранжевый | `#fdba74` |
| Август | Розовый | `#f9a8d4` |
| Сентябрь | Золотой | `#fbbf24` |

---

## 🚀 Деплой

### Веб-версия (Vercel/Netlify)

```bash
npm run build
# dist/ папка готова к деплою
```

### iOS (App Store)

1. Соберите в Xcode: **Product → Archive**
2. Загрузите через **Distribute App**
3. Дождитесь проверки Apple

---

## 📦 NPM Скрипты

```bash
npm run build            # Собрать веб-версию
npm run cap:sync         # Синхронизировать с Capacitor
npm run cap:open:ios     # Открыть в Xcode
npm run cap:build        # Собрать и синхронизировать
npm run cap:run:ios      # Запустить на симуляторе
```

---

## 🤝 Вклад в разработку

1. Fork репозитория
2. Создайте ветку: `git checkout -b feature/amazing-feature`
3. Коммитьте изменения: `git commit -m 'Add amazing feature'`
4. Push в ветку: `git push origin feature/amazing-feature`
5. Создайте Pull Request

---

## 📄 Лицензия

MIT License — используйте свободно!

---

## 👤 Автор

Создано с ❤️ в 2026 году

---

## 🙏 Благодарности

- **Capacitor** — за отличный bridge между веб и native
- **Supabase** — за простой и мощный backend
- **Tailwind CSS** — за потрясающую систему стилей
- **React** — за лучший UI фреймворк

---

## 📞 Поддержка

Если возникли вопросы:
- 📖 Читайте документацию в папке проекта
- 🐛 Создавайте Issues на GitHub
- 💬 Пишите в Discussions

---

## 🎉 Готово к использованию!

Клонируйте, настраивайте и наслаждайтесь вашими летними воспоминаниями! ☀️📸✨

```bash
git clone https://github.com/YOUR_USERNAME/summer-2026-ios.git
cd summer-2026-ios
npm install
npm run build
npx cap add ios
npm run cap:open:ios
```

**Happy coding! 🚀**