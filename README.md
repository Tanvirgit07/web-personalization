# web-personalization 🚀

> A zero-config, developer-friendly, and SSR-safe Web Personalization SDK based on **Time**, **Location**, **Weather**, and **Temperature**.

[![npm version](https://img.shields.io/npm/v/web-personalization.svg)](https://www.npmjs.com/package/web-personalization)
[![license](https://img.shields.io/npm/l/web-personalization.svg)](https://github.com/Tanvirgit07/web-personalization/blob/main/LICENSE)

---

## ✨ Features

- ⚡ **Zero-Config High Level API:** Get full context, text messages, dynamic UI themes, icons, and recommendations in 1 line of code.
- 🌐 **Automatic Geolocation & Geocoding:** Automatically resolves browser coordinates to city and country names via reverse geocoding.
- 🌤️ **Live Weather & Temperature Engine:** Automatically fetches live weather and temperature categories (sunny, rainy, cold, hot, etc.).
- 🎨 **Dynamic UI & Recommendations:** Provides dynamic CSS theme names, background classes, icons, and local action suggestions.
- 🛡️ **SSR & Server-Safe:** Compatible with Next.js (App & Pages router), Nuxt, Remix, and Node.js without breaking server components.
- ⚡ **Built-in Performance Caching:** Caches context results in-memory and `sessionStorage` to avoid redundant network calls and rate limiting.
- 🧩 **Dual API Design:** Use high-level `personalize()` or granular individual functions (`getDynamicUI`, `reverseGeocode`, etc.).

---

## 📦 Installation

```bash
npm install web-personalization
# or
yarn add web-personalization
# or
pnpm add web-personalization
```

---

## 🚀 Quick Start (Simple API)

```typescript
import { personalize } from "web-personalization";

async function run() {
  // 1-line full personalization
  const result = await personalize();

  console.log(result.message);               
  // Output: "Good evening from Dhaka! It's sunny and hot outside."

  console.log(result.context.location.city); 
  // Output: "Dhaka"

  console.log(result.experience?.ui);        
  // Output: { theme: "evening-hot", background: "evening-sunny", icon: "sun" }
}

run();
```

---

## ⚡ React / Next.js Integration Example

```tsx
'use client';

import { useEffect, useState } from "react";
import { personalize, PersonalizedResult } from "web-personalization";

export default function PersonalBanner() {
  const [data, setData] = useState<PersonalizedResult | null>(null);

  useEffect(() => {
    personalize().then(setData);
  }, []);

  if (!data) return <div>Loading personalization...</div>;

  return (
    <div className={`banner theme-${data.experience?.ui.theme}`}>
      <h2>{data.experience?.content.title}</h2>
      <p>{data.message}</p>
      
      <h3>Recommendations for you:</h3>
      <ul>
        {data.experience?.recommendations.map((item, i) => (
          <li key={i}>
            <strong>{item.title}:</strong> {item.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🎛️ Options Configuration (`PersonalizeOptions`)

You can pass options to `personalize(options?)` to customize behavior:

```typescript
const result = await personalize({
  // Fallback location if browser geolocation is denied or unavailable
  fallbackLocation: {
    latitude: 23.8103,
    longitude: 90.4125,
    city: "Dhaka",
    country: "Bangladesh"
  },
  enableCache: true,      // Enable context caching (default: true)
  cacheTimeoutMs: 600000,  // Cache expiration in ms (default: 10 minutes)
  includeExperience: true // Include UI theme, content & recommendations (default: true)
});
```

---

## 🧩 Advanced Granular API

If you only need specific feature engines, you can import them individually:

```typescript
import { 
  getTimePeriod, 
  getUserLocation, 
  reverseGeocode, 
  getCurrentWeather,
  getDynamicUI 
} from "web-personalization";

// 1. Time classification
const time = getTimePeriod(new Date()); // "morning" | "afternoon" | "evening" | "night"

// 2. Geolocation & Weather
const location = await getUserLocation();
const geocoded = await reverseGeocode(location);
const weather = await getCurrentWeather(location);

// 3. Dynamic UI themes
const ui = getDynamicUI(context);
```

---

## 📄 License

MIT © [Tanvir Ahmed](https://github.com/Tanvirgit07)
