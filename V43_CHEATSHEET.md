# 📋 V43 Cheatsheet — Шпаргалка

## 🏷️ Версия 43.0.0 — Quick Reference

---

## 🚀 Git Commands

```bash
# Инициализация
git init
git branch -M main
git remote add origin https://github.com/username/babkak-summer-2026.git

# Коммит v43
git add .
git commit -m "Release v43.0.0: Stable build without push notifications"
git tag -a v43.0.0 -m "Version 43.0.0"

# Пуш
git push -u origin main
git push origin v43.0.0
```

---

## 📱 Capacitor Commands

```bash
# Build + Sync
npm install
npm run build
npm run cap:sync

# Открыть Xcode
npm run cap:open:ios

# Полный pipeline
npm run cap:build
```

---

## 🔍 Быстрая проверка

### Версия актуальна?
```bash
grep '"version"' package.json
# Должно быть: "version": "43.0.0"
```

### Push удален?
```bash
grep -r "push-notifications" package.json
# Должно быть пусто
```

### Service Worker чист?
```bash
grep -i "push" public/sw.js
# Должно быть пусто или только комментарии
```

---

## 📂 Ключевые файлы v43

| Файл | Описание |
|------|----------|
| `/QUICK_DEPLOY_V43.md` | ⚡ Быстрый деплой |
| `/DEPLOY_V43.md` | 📖 Полная инструкция |
| `/RELEASE_NOTES_V43.md` | 📋 Release notes |
| `/VERSION_HISTORY.md` | 📚 История версий |
| `/.gitignore` | 🚫 Git exclusions |

---

## ⚙️ Xcode Settings

```
Bundle ID:    com.summer2026.babkak
Display Name: Summer 2026
Version:      43.0.0
Build:        43
iOS Target:   13.0+ (рекомендуется 15.0+)
```

---

## ✅ Checklist

### Перед push в GitHub:
- [ ] `package.json` version = 43.0.0
- [ ] `.gitignore` существует
- [ ] Push пакеты удалены
- [ ] `npm install` без ошибок

### Перед Xcode build:
- [ ] `npm run build` успешен
- [ ] `npm run cap:sync` выполнен
- [ ] Team выбран в Xcode
- [ ] Bundle ID корректный

---

## 🐛 Troubleshooting

### Build fails?
```bash
# Clean
rm -rf node_modules
rm -rf dist
npm install
npm run build
```

### Xcode errors?
```bash
cd ios/App
pod install
cd ../..
npm run cap:sync
```

### Git issues?
```bash
# Check remote
git remote -v

# Re-add if needed
git remote remove origin
git remote add origin https://github.com/username/repo.git
```

---

## 🎯 Основные изменения v43

| Что | Статус |
|-----|--------|
| Push-уведомления | ❌ Удалены |
| Service Worker | ✅ Очищен |
| Конфликты | ✅ Решены |
| Xcode build | ✅ Готов |
| GitHub | ✅ Готов |

---

## 📞 Help

- Полная инструкция: `DEPLOY_V43.md`
- Быстрый старт: `QUICK_DEPLOY_V43.md`
- История: `VERSION_HISTORY.md`

---

**v43.0.0** • Production Ready • 27.03.2026
