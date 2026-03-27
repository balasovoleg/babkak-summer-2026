# 📱 Настройка iOS виджета (как Locket)

## О виджетах iOS

iOS виджеты — это нативные SwiftUI компоненты, которые отображаются на Home Screen. Они требуют программирования на Swift.

## 🎯 Архитектура

```
┌─────────────────────────────────────┐
│  iOS Home Screen                    │
│  ┌───────────────┐                  │
│  │  Widget       │  ← SwiftUI       │
│  │  (Swift)      │                  │
│  └───────┬───────┘                  │
│          │                          │
│          ▼                          │
│  ┌───────────────┐                  │
│  │  App Groups   │  ← Shared Data  │
│  └───────┬───────┘                  │
│          │                          │
│          ▼                          │
│  ┌───────────────┐                  │
│  │  Main App     │  ← React/Web    │
│  │  (Capacitor)  │                  │
│  └───────────────┘                  │
└─────────────────────────────────────┘
```

## 📝 Пошаговая инструкция

### Шаг 1: Создание Widget Extension в Xcode

1. Откройте проект: `npm run cap:open:ios`
2. В Xcode: **File → New → Target**
3. Выберите **Widget Extension**
4. Имя: `Summer2026Widget`
5. Язык: **Swift**
6. Включите: **Include Configuration Intent**

### Шаг 2: Настройка App Groups

Для обмена данными между приложением и виджетом:

#### В Main App Target (App):
1. Signing & Capabilities → **+ Capability**
2. Добавьте **App Groups**
3. Создайте группу: `group.com.summer2026.shared`

#### В Widget Target (Summer2026Widget):
1. Повторите то же самое
2. Используйте **ту же группу**: `group.com.summer2026.shared`

### Шаг 3: Код виджета (Swift)

Создайте файл `Summer2026Widget.swift`:

```swift
import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), image: UIImage(named: "placeholder"))
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), image: loadLatestImage())
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        let currentDate = Date()
        let refreshDate = Calendar.current.date(byAdding: .minute, value: 15, to: currentDate)!
        
        let entry = SimpleEntry(date: currentDate, image: loadLatestImage())
        let timeline = Timeline(entries: [entry], policy: .after(refreshDate))
        completion(timeline)
    }
    
    func loadLatestImage() -> UIImage? {
        // Читаем данные из App Groups
        let sharedDefaults = UserDefaults(suiteName: "group.com.summer2026.shared")
        if let imageData = sharedDefaults?.data(forKey: "latestPhoto"),
           let image = UIImage(data: imageData) {
            return image
        }
        return UIImage(named: "placeholder")
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let image: UIImage?
}

struct Summer2026WidgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
        ZStack {
            if let image = entry.image {
                Image(uiImage: image)
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            } else {
                Color.purple.opacity(0.3)
                Text("📸")
                    .font(.system(size: 60))
            }
        }
        .containerBackground(for: .widget) {
            Color.clear
        }
    }
}

@main
struct Summer2026Widget: Widget {
    let kind: String = "Summer2026Widget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            Summer2026WidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Summer 2026")
        .description("Случайное фото из ваших летних воспоминаний")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}
```

### Шаг 4: Передача данных из React в виджет

Добавьте в ваш React компонент (например, `MediaGallery.tsx`):

```typescript
import { Capacitor } from '@capacitor/core';

// Функция для сохранения фото для виджета
const savePhotoForWidget = async (photoUrl: string) => {
  if (Capacitor.getPlatform() !== 'ios') return;
  
  try {
    // Загружаем фото
    const response = await fetch(photoUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const base64data = reader.result as string;
      
      // Сохраняем в App Groups через Capacitor Plugin
      // Для этого нужно создать кастомный Capacitor плагин
      // Или использовать Capacitor Preferences с App Groups
    };
    
    reader.readAsDataURL(blob);
  } catch (error) {
    console.error('Failed to save photo for widget:', error);
  }
};
```

### Шаг 5: Создание Capacitor Plugin для App Groups

Создайте файл `ios/App/App/WidgetPlugin.swift`:

```swift
import Capacitor

@objc(WidgetPlugin)
public class WidgetPlugin: CAPPlugin {
    @objc func saveImageForWidget(_ call: CAPPluginCall) {
        guard let base64String = call.getString("image") else {
            call.reject("Missing image data")
            return
        }
        
        if let imageData = Data(base64Encoded: base64String) {
            let sharedDefaults = UserDefaults(suiteName: "group.com.summer2026.shared")
            sharedDefaults?.set(imageData, forKey: "latestPhoto")
            sharedDefaults?.synchronize()
            
            // Обновляем виджет
            WidgetCenter.shared.reloadAllTimelines()
            
            call.resolve()
        } else {
            call.reject("Invalid image data")
        }
    }
}
```

Регистрируем плагин в `capacitor.config.ts`:

```typescript
{
  plugins: {
    WidgetPlugin: {
      // Настройки если нужны
    }
  }
}
```

### Шаг 6: Использование в React

```typescript
import { Plugins } from '@capacitor/core';

const { WidgetPlugin } = Plugins;

// При загрузке нового фото
const onPhotoUploaded = async (photoUrl: string) => {
  try {
    const response = await fetch(photoUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      const base64Data = base64.split(',')[1]; // Убираем префикс
      
      await WidgetPlugin.saveImageForWidget({ image: base64Data });
      console.log('✅ Photo saved for widget!');
    };
    
    reader.readAsDataURL(blob);
  } catch (error) {
    console.error('❌ Failed to save photo for widget:', error);
  }
};
```

## 🎨 Размеры виджетов iOS

- **Small** (systemSmall): 155x155 точек
- **Medium** (systemMedium): 329x155 точек  
- **Large** (systemLarge): 329x345 точек

## ⚡ Обновление виджета

Виджеты обновляются автоматически по расписанию Timeline. Вы можете:

1. **Принудительно обновить** из приложения:
```swift
WidgetCenter.shared.reloadAllTimelines()
```

2. **Настроить интервал обновления** в Provider:
```swift
// Обновлять каждые 15 минут
let refreshDate = Calendar.current.date(byAdding: .minute, value: 15, to: currentDate)!
```

3. **Фоновое обновление** через Background Tasks

## 📋 Checklist для виджета:

- [ ] Создан Widget Extension в Xcode
- [ ] Настроены App Groups для обоих targets
- [ ] Написан код виджета на Swift
- [ ] Создан Capacitor Plugin для передачи данных
- [ ] Интегрирован в React компоненты
- [ ] Протестирован на реальном устройстве
- [ ] Настроена иконка и preview виджета

## 🚨 Важно:

1. Виджеты **не работают на симуляторе** со сторонними данными
2. Тестируйте только на **реальном iPhone**
3. Размер данных в App Groups ограничен
4. Виджет не может выполнять сетевые запросы напрямую
5. Все данные должны передаваться через основное приложение

## 📚 Дополнительная документация:

- [WidgetKit Documentation](https://developer.apple.com/documentation/widgetkit)
- [App Groups Guide](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_security_application-groups)
- [Capacitor iOS Plugins](https://capacitorjs.com/docs/plugins/creating-plugins/ios-guide)

---

**Примечание:** Создание виджета требует знания Swift и опыта работы с Xcode. Это более продвинутая функция, которая выходит за рамки веб-разработки.

Если нужна помощь с реализацией - обращайтесь! 🚀
