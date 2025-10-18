# Weather Dashboard 🌤️

A modern, responsive weather dashboard built with Next.js, React, TypeScript, and Tailwind CSS. Get real-time weather updates and 5-day forecasts for any city worldwide.

![Weather Dashboard](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

- **Real-time Weather Data**: Current temperature, weather conditions, wind speed, and humidity
- **5-Day Forecast**: Detailed daily forecasts with high/low temperatures
- **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit
- **AI Weather Assistant**: Chat with an AI-powered weather assistant (powered by OpenAI)
- **City Search**: Search for weather in any city worldwide
- **Geolocation**: Automatically detects your location on first load
- **Responsive Design**: Beautiful UI that works on mobile, tablet, and desktop
- **Dark Mode Support**: Automatic dark mode based on system preferences
- **Modern UI**: Clean design with smooth animations and gradients
- **Weather Icons**: Intuitive emoji-based weather condition indicators

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. Clone or navigate to the project directory:
```bash
cd weather-dashboard
```

2. Create a `.env` file in the root directory and add your OpenAI API key:
```bash
OPEN_API_KEY=your_openai_api_key_here
```

3. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## 🏗️ Project Structure

```
weather-dashboard/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx            # Root layout component
│   └── page.tsx              # Home page
├── components/
│   ├── CurrentWeather.tsx    # Current weather display
│   ├── Forecast.tsx          # 5-day forecast container
│   ├── ForecastCard.tsx      # Individual forecast day card
│   ├── SearchBar.tsx         # City search input
│   └── WeatherDashboard.tsx  # Main dashboard component
├── lib/
│   ├── types.ts              # TypeScript type definitions
│   ├── weatherApi.ts         # API integration functions
│   └── weatherCodes.ts       # Weather condition mappings
├── public/                   # Static assets
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies
```

## 🌐 API

This project uses the free [Open-Meteo API](https://open-meteo.com/) for weather data:
- **No API key required** - completely free to use
- **Weather Forecast API** - current conditions and daily forecasts
- **Geocoding API** - city name to coordinates conversion

## 🎨 Technologies

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Open-Meteo API](https://open-meteo.com/)** - Free weather data API

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints for:
- **Mobile**: Single column layout (< 640px)
- **Tablet**: Two column forecast grid (640px - 1024px)
- **Desktop**: Five column forecast grid (> 1024px)

## 🌙 Dark Mode

The app automatically adapts to your system's dark mode preference using CSS media queries and Tailwind's dark mode utilities.

## 🔧 Customization

### Change Default City

Edit `components/WeatherDashboard.tsx` and modify the default city in the `useEffect` hook:

```typescript
fetchWeatherForCity('Your City Name');
```

### Modify Weather Icons

Edit `lib/weatherCodes.ts` to customize weather condition descriptions and icons.

### Adjust Styling

All components use Tailwind CSS classes. Modify the classes in component files or extend the theme in `tailwind.config.js`.

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- Icons by [Lucide](https://lucide.dev/)
- Built with [Next.js](https://nextjs.org/)

---

Made with ❤️ using Next.js and React
