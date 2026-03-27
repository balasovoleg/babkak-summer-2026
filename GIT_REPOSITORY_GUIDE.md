# 📦 Инструкция по созданию Git Repository для Xcode

## 🎯 Цель

Создать Git репозиторий, который можно:
1. Клонировать в Xcode с помощью "Clone Git Repository"
2. Собрать iOS приложение
3. Запустить на iPhone

---

## 📝 Пошаговая инструкция

### Шаг 1: Инициализация Git (локально)

```bash
# Перейдите в корневую папку проекта
cd /путь/к/проекту

# Инициализируйте Git
git init

# Добавьте все файлы
git add .

# Сделайте первый коммит
git commit -m "Initial commit: Summer 2026 iOS app with Capacitor"
```

### Шаг 2: Создание репозитория на GitHub

1. Зайдите на [github.com](https://github.com)
2. Нажмите **New repository**
3. Название: `summer-2026-ios`
4. Описание: `Interactive summer 2026 checklist and memories app with Capacitor for iOS`
5. **Не** добавляйте README, .gitignore, license (у вас уже есть)
6. Нажмите **Create repository**

### Шаг 3: Подключение к GitHub

```bash
# Добавьте remote origin (замените YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/summer-2026-ios.git

# Переименуйте ветку в main (если нужно)
git branch -M main

# Отправьте код на GitHub
git push -u origin main
```

### Шаг 4: Клонирование в Xcode

Теперь **на любом Mac** вы можете:

1. Откройте Xcode
2. **Welcome to Xcode** → **Clone Git Repository**
3. Вставьте URL: `https://github.com/YOUR_USERNAME/summer-2026-ios.git`
4. Нажмите **Clone**
5. Выберите папку для сохранения

### Шаг 5: Настройка после клонирования

```bash
# В терминале перейдите в склонированную папку
cd summer-2026-ios

# Установите зависимости
npm install

# Соберите проект
npm run build

# Добавьте iOS платформу (если её нет)
npx cap add ios

# Синхронизируйте
npm run cap:sync

# Откройте в Xcode
npm run cap:open:ios
```

---

## 🔐 Приватный репозиторий (рекомендуется)

Если вы хотите сделать репозиторий **приватным**:

1. На GitHub: **Settings** → **Danger Zone** → **Change visibility**
2. Выберите **Make private**

Для клонирования приватного репозитория нужно:
- Использовать SSH ключ
- Или Personal Access Token (PAT)

### Настройка SSH (рекомендуется):

```bash
# Генерируем SSH ключ
ssh-keygen -t ed25519 -C "your_email@example.com"

# Копируем ключ
cat ~/.ssh/id_ed25519.pub

# Добавляем на GitHub:
# GitHub → Settings → SSH and GPG keys → New SSH key
```

Затем клонируйте через SSH:
```
git clone git@github.com:YOUR_USERNAME/summer-2026-ios.git
```

---

## 📁 Структура репозитория

```
summer-2026-ios/
├── .gitignore               ← Исключает node_modules, dist, ios/
├── capacitor.config.ts      ← Конфиг Capacitor
├── package.json             ← Зависимости и скрипты
├── src/                     ← React приложение
├── public/                  ← Статические файлы
├── supabase/                ← Backend код
├── README_XCODE.md          ← Быстрый старт
├── CAPACITOR_IOS_SETUP.md   ← Полная инструкция
└── IOS_WIDGET_GUIDE.md      ← Гайд по виджетам
```

**Важно:** Папки `ios/`, `android/`, `node_modules/`, `dist/` **НЕ** загружаются в Git (см. `.gitignore`)

---

## 🚀 Командная работа

### Для нового разработчика:

```bash
# 1. Клонировать репозиторий
git clone https://github.com/YOUR_USERNAME/summer-2026-ios.git
cd summer-2026-ios

# 2. Установить зависимости
npm install

# 3. Собрать и открыть в Xcode
npm run build
npx cap add ios
npm run cap:open:ios
```

### Рабочий процесс:

```bash
# Создать новую ветку для функции
git checkout -b feature/push-notifications

# Внести изменения и коммитить
git add .
git commit -m "Add push notifications support"

# Отправить на GitHub
git push origin feature/push-notifications

# Создать Pull Request на GitHub
```

---

## 🔄 Обновление iOS проекта

Когда вы меняете код React:

```bash
# 1. Внесите изменения в src/
# 2. Соберите проект
npm run build

# 3. Синхронизируйте с iOS
npm run cap:sync

# 4. Xcode автоматически обновится
```

---

## 📋 Checklist для Git

- [ ] Git инициализирован (`git init`)
- [ ] Добавлен `.gitignore`
- [ ] Первый коммит сделан
- [ ] Репозиторий создан на GitHub
- [ ] Remote origin настроен
- [ ] Код залит на GitHub (`git push`)
- [ ] Репозиторий можно клонировать
- [ ] После клонирования `npm install` работает
- [ ] iOS проект собирается

---

## 🎯 Готовые команды для копирования

### Для владельца репозитория:

```bash
# Инициализация
git init
git add .
git commit -m "Initial commit: Summer 2026 iOS app"
git remote add origin https://github.com/YOUR_USERNAME/summer-2026-ios.git
git branch -M main
git push -u origin main
```

### Для клонирования:

```bash
# Клонирование
git clone https://github.com/YOUR_USERNAME/summer-2026-ios.git
cd summer-2026-ios

# Настройка
npm install
npm run build
npx cap add ios
npm run cap:open:ios
```

---

## 🌟 Дополнительные возможности

### GitHub Actions (CI/CD)

Создайте `.github/workflows/ios.yml` для автоматической сборки:

```yaml
name: iOS Build

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: macos-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Install dependencies
      run: npm install
    
    - name: Build web app
      run: npm run build
    
    - name: Sync Capacitor
      run: npx cap sync ios
    
    - name: Build iOS app
      run: xcodebuild -workspace ios/App/App.xcworkspace -scheme App build
```

---

## ❓ Часто задаваемые вопросы

**Q: Почему папка `ios/` не в Git?**  
A: Она генерируется автоматически командой `npx cap add ios`. Это стандартная практика для Capacitor проектов.

**Q: Как поделиться проектом с другим Mac?**  
A: Просто дайте ссылку на GitHub репозиторий. Человек клонирует его и запустит `npm install && npm run build && npx cap add ios`.

**Q: Можно ли использовать GitLab/Bitbucket?**  
A: Да! Процесс аналогичен, просто используйте другой сервис вместо GitHub.

**Q: Что делать если Xcode не видит изменения?**  
A: Запустите `npm run cap:sync` и перезапустите Xcode.

---

## 🎉 Готово!

Теперь у вас есть полноценный Git репозиторий, который можно:
- ✅ Клонировать через Xcode
- ✅ Открыть и собрать на любом Mac
- ✅ Запустить на iPhone
- ✅ Развивать командой
- ✅ Публиковать в App Store

**Успехов с разработкой! 🚀📱**
