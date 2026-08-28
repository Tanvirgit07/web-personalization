# 🌟 web-personalization SDK

A lightweight, developer-friendly web personalization SDK powered by real-time location, local weather, temperature, and client time period data.

---

## 🚀 Features

- 📍 **Automatic Location Detection**: IP & Geolocation fallback mechanism.
- 🌤️ **Real-Time Weather Context**: Detects `sunny`, `rainy`, `cloudy`, `stormy`, and `night` conditions.
- 🌡️ **Temperature Insights**: Categorizes environments (`cold`, `comfortable`, `hot`/`warm`).
- ⏰ **Client Time Awareness**: `morning`, `afternoon`, `evening`, and `night` context greetings.
- 💡 **Dynamic Experience Engine**: Generates content suggestions, custom messages, and local activity recommendations.
- ⚡ **Framework Agnostic**: Works seamlessly with React, Next.js, Vue, Svelte, or Vanilla JavaScript.

---

## 📦 Installation

```bash
npm install web-personalization
```

---

## ⚡ Quick Start

```typescript
import { personalize } from "web-personalization";

async function loadPersonalization() {
  const result = await personalize({
    fallbackLocation: {
      latitude: 23.8103,
      longitude: 90.4125,
      city: "Dhaka",
      country: "Bangladesh",
    },
    enableCache: true,
    includeExperience: true,
  });

  console.log("Personalization Result:", result);
}

loadPersonalization();
```

---

## 📄 SDK Response Structure & Response Example

When you call `personalize()`, the SDK returns a structured JSON object. Here is an exact example of the response format:

```json
{
  "context": {
    "time": "evening",
    "location": {
      "city": "Dhaka",
      "country": "Bangladesh",
      "latitude": 23.8103,
      "longitude": 90.4125
    },
    "weather": {
      "category": "rainy",
      "description": "Light Rain",
      "humidity": 82
    },
    "temperature": {
      "value": 28.5,
      "unit": "celsius",
      "category": "warm"
    }
  },
  "experience": {
    "content": {
      "title": "Good evening from Dhaka!",
      "message": "It's rainy and warm outside. Ideal time for indoor productivity or online learning."
    },
    "recommendations": [
      {
        "id": "rec-1",
        "title": "Rainy Day Indoor Workstation Setup",
        "message": "Stay dry and focus on indoor deep work or virtual team meetings."
      },
      {
        "id": "rec-2",
        "title": "Evening Warm Beverage Break",
        "message": "Enjoy a hot cup of tea or coffee while working on your dashboard."
      }
    ]
  }
}
```

---

## 🎨 Design Flexibility & Customization Possibilities

The SDK provides structured raw context & recommendation data. **Developers are free to build any UI components** using this response, including:

1. 💬 **Personalized Recommendation Modals**: Floating glassmorphic widgets, auto-rotating carousels, auto-dismiss timers, and settings.
2. 🌤️ **Dynamic Weather Themes**: Adapt background gradients, borders, and card colors automatically based on `context.weather.category`.
3. 🔔 **Custom Header Banners & Notification Toasts**: Display real-time personalized greetings like `"Good evening from Dhaka!"`.

---

## 🖼️ Implementation Screenshots & Proof

Showcasing real-time weather theme adaptations and recommendation modal implementations built using `web-personalization`:

### 🌤️ Weather Category Themes & Personalization UI

| 1. Sunny Theme | 2. Rainy Theme |
| :---: | :---: |
| ![Sunny Theme](https://raw.githubusercontent.com/Tanvirgit07/web-personalization/main/screenshots/image1.png) | ![Rainy Theme](https://raw.githubusercontent.com/Tanvirgit07/web-personalization/main/screenshots/image2.png) |

| 3. Cloudy Theme | 4. Stormy Theme |
| :---: | :---: |
| ![Cloudy Theme](https://raw.githubusercontent.com/Tanvirgit07/web-personalization/main/screenshots/image3.png) | ![Stormy Theme](https://raw.githubusercontent.com/Tanvirgit07/web-personalization/main/screenshots/image4.png) |

| 5. Night Theme |
| :---: |
| ![Night Theme](https://raw.githubusercontent.com/Tanvirgit07/web-personalization/main/screenshots/image5.png) |
