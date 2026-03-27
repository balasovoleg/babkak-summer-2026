# ⚡ Быстрый старт за 2 минуты

## 🎯 Для Xcode (iOS приложение)

### Вариант 1: Если у вас УЖЕ есть код

```bash
npm install && npm run build && npx cap add ios && npm run cap:open:ios
```

Готово! Xcode откроется автоматически.

### Вариант 2: Клонирование из Git

```bash
git clone https://github.com/YOUR_USERNAME/summer-2026-ios.git
cd summer-2026-ios
npm install && npm run build && npx cap add ios && npm run cap:open:ios
```

---

## 📱 В Xcode

1. Выберите симулятор iPhone или реальное устройство
2. Нажмите ▶ **Run** (Cmd + R)
3. Готово! Приложение запущено 🎉

---

## 🔔 Включить Push-уведомления

1. В Xcode: **Signing & Capabilities**
2. Кнопка **+ Capability**
3. Выберите **Push Notifications**
4. Готово!

(Работают только на реальном iPhone, не на симуляторе)

---

## 🌐 Для веб-версии (PWA)

```bash
npm install
npm run dev
```

Откройте: http://localhost:5173

---

## 📦 Создать Git репозиторий

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/summer-2026-ios.git
git push -u origin main
```

---

## 🆘 Проблемы?

**Ошибка при `cap add ios`?**

```bash
npm run build
npx cap add ios --confirm
```

**Xcode не открывается?**

```bash
open ios/App/App.xcworkspace
```

**Нужно пересобрать?**

```bash
rm -rf ios && npm run build && npx cap add ios
```

---

## 📚 Полная документация

- [README_XCODE.md](README_XCODE.md) — Подробная инструкция
- [CAPACITOR_IOS_SETUP.md](CAPACITOR_IOS_SETUP.md) — Все про iOS
- [IOS_WIDGET_GUIDE.md](IOS_WIDGET_GUIDE.md) — Создание виджетов

---

**Готово! Начните разработку! 🚀**