# 📱 PWA: Babkak Summer 2026

## ✨ Что такое PWA?

Progressive Web App (PWA) — это веб-приложение, которое можно установить на любое устройство (телефон, планшет, компьютер) и использовать как обычное приложение!

## 🎯 Возможности нашего PWA

### ✅ Основные функции:
- 📥 **Установка на устройство** - работает как нативное приложение
- 🚀 **Быстрая загрузка** - кэширование ресурсов
- 📴 **Офлайн-режим** - базовая работа без интернета
- 🔔 **Push-уведомления** (опционально)
- 📱 **Адаптивный дизайн** - работает на всех устройствах
- 🏠 **Иконка на главном экране** - быстрый доступ
- 🎨 **Фирменный дизайн** - собственная тема и splash screen

## 📦 Что установлено

### Файлы PWA:
```
/public/
  ├── manifest.json          # Манифест приложения
  ├── sw.js                  # Service Worker
  ├── offline.html           # Офлайн-страница
  └── icons/                 # Иконки приложения
      ├── icon.svg           # SVG иконка
      ├── generate-icons.html # Генератор PNG иконок
      └── .placeholder       # Инструкции
```

### Компоненты:
- `PWAInstall.tsx` - Компонент предложения установки
- `index.html` - Обновлённый с PWA мета-тегами
- `main.tsx` - Точка входа приложения

## 🚀 Как использовать

### Установка на устройство:

#### На Android (Chrome):
1. Откройте сайт в Chrome
2. Нажмите на меню (⋮) → "Установить приложение"
3. Или используйте всплывающее предложение "Установить"

#### На iOS (Safari):
1. Откройте сайт в Safari
2. Нажмите кнопку "Поделиться" (□↑)
3. Выберите "На экран «Домой»"
4. Нажмите "Добавить"

#### На Desktop (Chrome/Edge):
1. Найдите иконку установки в адресной строке
2. Или в меню → "Установить Babkak Summer 2026"

### Проверка PWA:

1. **Lighthouse в Chrome DevTools:**
   - Откройте DevTools (F12)
   - Перейдите во вкладку "Lighthouse"
   - Выберите "Progressive Web App"
   - Нажмите "Analyze page load"

2. **Application Tab:**
   - DevTools → Application
   - Проверьте Manifest, Service Workers, Storage

## 🎨 Создание иконок

### Вариант 1: Автоматическая генерация
1. Откройте файл `/public/icons/generate-icons.html` в браузере
2. Нажмите "Скачать все"
3. Сохраните иконки в `/public/icons/`

### Вариант 2: Онлайн-сервисы
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [PWA Builder](https://www.pwabuilder.com/imageGenerator)
- [Favicon.io](https://favicon.io/)

### Требуемые размеры:
- 72x72, 96x96, 128x128, 144x144
- 152x152, 192x192, 384x384, 512x512

## 🔧 Настройка

### Изменить название приложения:
Отредактируйте `/public/manifest.json`:
```json
{
  "name": "Ваше название",
  "short_name": "Короткое",
  "description": "Описание"
}
```

### Изменить цвета:
```json
{
  "background_color": "#fef9f5",
  "theme_color": "#f8b4d9"
}
```

### Настроить кэширование:
Отредактируйте `/public/sw.js`:
- `CACHE_NAME` - версия кэша
- `PRECACHE_URLS` - файлы для предварительного кэша

## 📊 Функции Service Worker

### Стратегии кэширования:
- **Network First** - сначала сеть, потом кэш
- API запросы НЕ кэшируются (всегда актуальные данные)
- Supabase запросы НЕ кэшируются
- Статические ресурсы кэшируются

### Офлайн-режим:
- При потере соединения показывается `/offline.html`
- Автоматическая проверка восстановления связи
- Перезагрузка при восстановлении

## 🔔 Push-уведомления (опционально)

Service Worker уже настроен для push-уведомлений!

Для активации нужно:
1. Добавить VAPID ключи на сервере
2. Запросить разрешение у пользователя
3. Подписаться на push-события

## 🐛 Отладка

### Проверка установки Service Worker:
```javascript
// В консоли браузера
navigator.serviceWorker.getRegistrations().then(registrations => {
  console.log('Registered SWs:', registrations.length);
  registrations.forEach(sw => console.log(sw.scope));
});
```

### Принудительное обновление:
```javascript
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(registration => registration.update());
});
```

### Удаление Service Worker:
```javascript
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(registration => registration.unregister());
});
```

### Очистка кэша:
```javascript
caches.keys().then(names => {
  names.forEach(name => caches.delete(name));
});
```

## 📱 Тестирование

### Локально:
1. `npm run dev` или `vite`
2. Откройте в Chrome
3. DevTools → Application → Service Workers

### Production:
PWA **требует HTTPS** (кроме localhost)!

## ⚡ Производительность

### Оптимизации:
- ✅ Code splitting (react-vendor chunk)
- ✅ Кэширование статики
- ✅ Lazy loading компонентов
- ✅ Сжатие ресурсов

### Метрики:
- First Paint: < 1s
- Time to Interactive: < 3s
- Lighthouse Score: 90+

## 🎉 Готово!

Ваше приложение теперь:
- 📱 Устанавливается как приложение
- ⚡ Быс��ро загружается
- 📴 Работает офлайн (базово)
- 🎨 Имеет красивую иконку
- 🚀 Оптимизировано

---

**Примечание:** После любых изменений в Service Worker обновите `CACHE_NAME` для принудительного обновления кэша у пользователей!
