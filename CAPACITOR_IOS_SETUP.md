# 📱 Инструкция по настройке iOS приложения для Xcode

## ✅ Что уже сделано:

1. ✅ Установлен Capacitor и iOS плагины
2. ✅ Создан конфигурационный файл `capacitor.config.ts`
3. ✅ Добавлена поддержка Push-уведомлений
4. ✅ Интегрированы настройки в шестерёнку (Settings)
5. ✅ Настроены npm скрипты для работы с iOS

---

## 🚀 Как открыть проект в Xcode

### Шаг 1: Установите зависимости (если ещё не установлены)
```bash
npm install
# или
pnpm install
```

### Шаг 2: Соберите веб-приложение
```bash
npm run build
```

### Шаг 3: Инициализируйте iOS платформу
```bash
npx cap add ios
```

### Шаг 4: Синхронизируйте код с iOS
```bash
npm run cap:sync
```

### Шаг 5: Откройте проект в Xcode
```bash
npm run cap:open:ios
```

Или вручную:
```bash
open ios/App/App.xcworkspace
```

---

## 📦 Что получите в Xcode:

После выполнения команд выше у вас появится папка `/ios/` с полноценным iOS проектом:

```
ios/
├── App/
│   ├── App.xcodeproj/
│   ├── App.xcworkspace/  ← Открывайте этот файл в Xcode!
│   ├── App/
│   │   ├── Info.plist
│   │   ├── Assets.xcassets/
│   │   └── ...
│   └── Podfile
```

---

## 🔔 Настройка Push-уведомлений в Xcode

### 1. Добавьте Capability
1. Откройте проект в Xcode
2. Выберите **App** в Project Navigator
3. Перейдите на вкладку **Signing & Capabilities**
4. Нажмите **+ Capability**
5. Добавьте **Push Notifications**

### 2. Настройте App ID на Apple Developer
1. Зайдите на [developer.apple.com](https://developer.apple.com)
2. Перейдите в **Certificates, Identifiers & Profiles**
3. Создайте/обновите App ID: `com.summer2026.babkak`
4. Включите **Push Notifications**
5. Создайте APNs сертификат (Development и Production)

### 3. Настройте Provisioning Profile
1. Создайте Development и Distribution профили
2. Скачайте и установите профили
3. Выберите нужный профиль в Xcode → Signing & Capabilities

---

## 📱 Запуск на устройстве/симуляторе

### Запуск на симуляторе iPhone:
```bash
npm run cap:run:ios
```

Или в Xcode:
1. Выберите симулятор (например, iPhone 15 Pro)
2. Нажмите **▶ Run** (Cmd + R)

### Запуск на реальном iPhone:
1. Подключите iPhone через USB
2. Разблокируйте телефон
3. Выберите ваш iPhone в списке устройств Xcode
4. Нажмите **▶ Run**
5. На iPhone: Settings → General → VPN & Device Management → Trust Developer

---

## 🎨 Что работает в iOS приложении:

✅ **Все функции веб-версии:**
- Интерактивные чеклисты с синхронизацией
- Медиа-галерея (до 30 фото/видео на месяц)
- Песни месяца
- Locket виджет
- Rewind страница
- Офлайн-режим (Service Worker)

✅ **Дополнительно для iOS:**
- 📲 Push-уведомления (работают только на реальном устройстве)
- 🎨 Нативный UI iOS
- 📱 Полноэкранный режим
- ⚡ Плавные анимации
- 🔔 Настройка уведомлений через шестерёнку

---

## 🛠 Полезные команды

```bash
# Собрать веб-версию и синхронизировать с iOS
npm run cap:build

# Только синхронизация (без пересборки)
npm run cap:sync

# Открыть Xcode
npm run cap:open:ios

# Запустить на симуляторе
npm run cap:run:ios

# Посмотреть логи в реальном времени
npx cap run ios -l
```

---

## 📝 Настройка иконки и splash screen

### 1. Иконка приложения:
Замените файлы в:
```
ios/App/App/Assets.xcassets/AppIcon.appiconset/
```

Нужны размеры:
- 1024x1024 (App Store)
- 180x180 (iPhone 3x)
- 120x120 (iPhone 2x)
- 167x167 (iPad Pro)

### 2. Splash Screen:
Замените файлы в:
```
ios/App/App/Assets.xcassets/Splash.imageset/
```

Или используйте [Capacitor Assets Generator](https://github.com/ionic-team/capacitor-assets):
```bash
npm install -g @capacitor/assets
capacitor-assets generate
```

---

## 🎯 Следующие шаги для разработки iOS виджета

Если хотите добавить **iOS Home Screen Widget** (как Locket):

1. В Xcode: File → New → Target → Widget Extension
2. Создайте SwiftUI виджет
3. Используйте Capacitor Bridge для передачи данных из веб-приложения
4. Настройте App Groups для обмена данными между приложением и виджетом

Документация: https://developer.apple.com/widgets/

---

## 🚨 Важные замечания:

1. **Push-уведомления** работают только на **реальном устройстве**, не на симуляторе
2. Для публикации в App Store нужен **Apple Developer Account** ($99/год)
3. Bundle ID должен быть уникальным: `com.summer2026.babkak`
4. Для тестирования пушей используйте TestFlight

---

## 📚 Дополнительные ресурсы:

- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- [iOS Push Notifications Guide](https://capacitorjs.com/docs/apis/push-notifications)
- [Apple Developer Documentation](https://developer.apple.com/documentation/)
- [Capacitor Community](https://github.com/capacitor-community)

---

## 🎉 Готово!

Теперь у вас есть полноценное iOS приложение, готовое для:
- Разработки в Xcode
- Тестирования на iPhone
- Публикации в App Store
- Добавления нативных iOS функций

**Удачи с разработкой! 🚀✨**

---

## 💡 Нужна помощь?

Если возникли проблемы:
1. Проверьте версии: `npx cap doctor`
2. Пересоберите: `npm run cap:build`
3. Очистите кэш: `rm -rf ios && npx cap add ios`
4. Проверьте логи в Xcode: View → Debug Area → Show Debug Area
