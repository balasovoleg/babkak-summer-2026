# 🚀 Быстрый деплой v43.0.0

## GitHub (5 минут)

```bash
# 1. Инициализация (если нужно)
git init
git branch -M main

# 2. Добавить remote
git remote add origin https://github.com/your-username/babkak-summer-2026.git

# 3. Коммит версии 43
git add .
git commit -m "Release v43.0.0: Stable build without push notifications"
git tag -a v43.0.0 -m "Version 43.0.0"

# 4. Пуш
git push -u origin main
git push origin v43.0.0
```

✅ **Готово!** Код в GitHub.

---

## Xcode (10 минут)

```bash
# 1. Установка зависимостей
npm install

# 2. Production build
npm run build

# 3. Синхронизация
npm run cap:sync

# 4. Открыть Xcode
npm run cap:open:ios
```

### В Xcode:
1. **Signing & Capabilities** → выбрать Team
2. **General** → Version: `43.0.0`, Build: `43`
3. Выбрать устройство (симулятор или реальное)
4. Нажать ▶️ **Run**

✅ **Готово!** Приложение запущено.

---

## Финальная проверка

- [ ] Приложение запускается
- [ ] Все месяцы работают
- [ ] Свайпы плавные
- [ ] Чеклисты сохраняются
- [ ] Нет ошибок push-уведомлений
- [ ] Offline режим работает

---

## 📄 Полная документация

Подробные инструкции: [`DEPLOY_V43.md`](/DEPLOY_V43.md)

История версий: [`VERSION_HISTORY.md`](/VERSION_HISTORY.md)

---

**v43.0.0** • Production Ready • 27 марта 2026
