# Деплой версии 43.0.0 в GitHub и Xcode

## 📋 Пре-деплой чеклист

### ✅ Проверки перед деплоем:
- [x] Версия обновлена до 43.0.0 в `package.json`
- [x] Push-уведомления полностью удалены из кодовой базы
- [x] Service Worker очищен (`public/sw.js`)
- [x] Все зависимости актуальны и конфликтов нет
- [x] Capacitor настроен для iOS
- [x] Все компоненты и хуки на месте

---

## 🚀 Шаг 1: Деплой в GitHub

### 1.1 Инициализация Git репозитория (если еще не сделано)
```bash
git init
git branch -M main
```

### 1.2 Добавление удаленного репозитория
```bash
# Замените на URL вашего репозитория
git remote add origin https://github.com/your-username/babkak-summer-2026.git
```

### 1.3 Создание .gitignore
Убедитесь, что файл `.gitignore` содержит:
```
# Dependencies
node_modules/
.pnpm-store/

# Build output
dist/
build/

# Capacitor
ios/App/Pods/
ios/App/App.xcworkspace
android/

# Environment
.env
.env.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Service Worker cache
sw.js.map
```

### 1.4 Коммит и пуш версии 43
```bash
# Добавить все файлы
git add .

# Создать коммит версии 43
git commit -m "Release v43.0.0: Stable build without push notifications"

# Создать тег версии
git tag -a v43.0.0 -m "Version 43.0.0 - Production ready for Xcode"

# Пуш в main branch
git push -u origin main

# Пуш тега
git push origin v43.0.0
```

---

## 📱 Шаг 2: Подготовка к Xcode

### 2.1 Установка зависимостей (если еще не установлены)
```bash
# Установка npm зависимостей
npm install

# Или если используете pnpm
pnpm install
```

### 2.2 Сборка production версии
```bash
# Создание production build
npm run build

# Результат появится в папке dist/
```

### 2.3 Синхронизация с Capacitor
```bash
# Копирование web-ресурсов в iOS проект
npm run cap:sync

# Эта команда:
# 1. Копирует dist/ в ios/App/App/public/
# 2. Обновляет нативные плагины
# 3. Синхронизирует конфигурацию
```

---

## 🍎 Шаг 3: Открытие и настройка в Xcode

### 3.1 Открытие проекта в Xcode
```bash
# Автоматическое открытие
npm run cap:open:ios

# Или вручную откройте:
# ios/App/App.xcworkspace (НЕ .xcodeproj!)
```

### 3.2 Настройка в Xcode

#### 3.2.1 Выбор Team и Bundle Identifier
1. Откройте проект в Xcode
2. Выберите корневой элемент "App" в Project Navigator
3. На вкладке "Signing & Capabilities":
   - **Team**: выберите вашу Apple Developer команду
   - **Bundle Identifier**: `com.summer2026.babkak` (уже настроен)

#### 3.2.2 Настройка Display Name и Version
1. В разделе "General":
   - **Display Name**: `Summer 2026`
   - **Version**: `43.0.0`
   - **Build**: `43` (или инкрементный номер)

#### 3.2.3 Проверка Deployment Target
- **iOS Deployment Target**: минимум iOS 13.0 (рекомендуется iOS 15.0+)

#### 3.2.4 Проверка Info.plist
Убедитесь, что `Info.plist` содержит:
```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <false/>
</dict>
```

### 3.3 Сборка и тестирование

#### 3.3.1 Выбор устройства
- Выберите симулятор (например, iPhone 15 Pro)
- Или подключите реальное iOS-устройство

#### 3.3.2 Запуск
1. Нажмите `Cmd + R` или кнопку ▶️ (Play)
2. Дождитесь сборки и запуска приложения
3. Проверьте основные функции:
   - Загрузка приложения
   - Навигация между месяцами
   - Работа чеклистов
   - Синхронизация с Supabase (при наличии интернета)
   - Работа offline режима

---

## 🧪 Шаг 4: Тестирование версии 43

### Функциональные тесты:
- [ ] Приложение запускается без ошибок
- [ ] Все месяцы (май-сентябрь) отображаются корректно
- [ ] Свайпы между месяцами работают плавно
- [ ] Чеклисты сохраняются и загружаются
- [ ] Медиа-галереи открываются
- [ ] Музыка воспроизводится (если загружена)
- [ ] Синхронизация с Supabase работает
- [ ] Offline режим функционирует
- [ ] Service Worker корректно кеширует ресурсы
- [ ] Нет console errors связанных с push-уведомлениями

### Performance тесты:
- [ ] Приложение загружается быстро (<3 сек)
- [ ] Нет memory leaks
- [ ] Плавная анимация (60 FPS)
- [ ] Батарея расходуется нормально

---

## 📦 Шаг 5: Создание архива для App Store (опционально)

### 5.1 Архивация
1. В Xcode: `Product > Archive`
2. Дождитесь завершения сборки
3. Откроется Organizer с архивами

### 5.2 Validation
1. Выберите архив
2. Нажмите "Validate App"
3. Дождитесь проверки Apple

### 5.3 Отправка в App Store Connect
1. Нажмите "Distribute App"
2. Выберите "App Store Connect"
3. Следуйте инструкциям wizard

---

## 🔍 Troubleshooting

### Проблема: "No such module 'Capacitor'"
**Решение:**
```bash
cd ios/App
pod install
cd ../..
npm run cap:sync
```

### Проблема: Build fails с ошибками Swift
**Решение:**
1. Очистить build folder: `Cmd + Shift + K`
2. Удалить DerivedData: `Cmd + Shift + Option + K`
3. Пересобрать проект

### Проблема: App запускается, но белый экран
**Решение:**
1. Проверьте, что `npm run build` выполнен
2. Проверьте, что `npm run cap:sync` выполнен
3. В Safari: Web Inspector > подключиться к приложению для debug

### Проблема: Capacitor plugins не работают
**Решение:**
```bash
# Переустановка плагинов
npm run cap:sync ios
```

---

## 📝 Checklist финального деплоя

### GitHub:
- [ ] Код запушен в main branch
- [ ] Тег v43.0.0 создан и запушен
- [ ] README.md актуален
- [ ] .gitignore корректный

### Xcode:
- [ ] Проект открывается без ошибок
- [ ] Build успешный
- [ ] Приложение запускается на симуляторе
- [ ] Приложение запускается на реальном устройстве
- [ ] Все функции работают
- [ ] Нет критических warnings
- [ ] Push-уведомления ОТСУТСТВУЮТ (намеренно удалены)

### Documentation:
- [ ] VERSION_HISTORY.md обновлен
- [ ] DEPLOY_V43.md создан
- [ ] Все README файлы актуальны

---

## ✅ Версия 43.0.0 готова к production!

**Особенности этой версии:**
- 🚫 Без Push-уведомлений (намеренно удалены)
- ✅ Стабильная сборка для Xcode
- ✅ Чистая кодовая база
- ✅ Готова к App Store submission
- ✅ Полная PWA функциональность
- ✅ Offline-first подход

**Следующие шаги:**
1. Деплой на TestFlight для бета-тестирования
2. Сбор обратной связи
3. Подготовка к публикации в App Store

---

**Дата релиза:** 27 марта 2026  
**Статус:** ✅ Production Ready
