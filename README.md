# Tasbeh Counter - Telegram Mini App

A beautiful and feature-rich Tasbeh Counter application built as a Telegram Mini App. This application helps Muslims keep track of their daily dhikr (remembrance of Allah) with an intuitive interface and multiple useful features.

## 🌟 Features

- **Dhikr Counter**: Track your daily dhikr with a beautiful counter interface
- **Multiple Dhikr Options**: Choose from various dhikr options or add your own
- **Prayer Times**: View daily prayer times based on your location
- **Qibla Compass**: Find the Qibla direction with a built-in compass
- **Hijri Calendar**: View the current Hijri date
- **Dark Mode Support**: Automatically adapts to your system theme
- **Telegram Integration**: Seamlessly works within Telegram's interface

## 🛠️ Technical Stack

- **Frontend**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS with Telegram's design system
- **State Management**: React Hooks
- **API Integration**: Telegram WebApp SDK

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/tasbeh-counter.git
cd tasbeh-counter
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## 🎨 Design System

The application uses Telegram's native design system with the following color variables:

```css
--tg-theme-bg-color: Background color
--tg-theme-text-color: Text color
--tg-theme-hint-color: Secondary text color
--tg-theme-link-color: Link color
--tg-theme-button-color: Button color
--tg-theme-button-text-color: Button text color
--tg-theme-secondary-bg-color: Secondary background color
```

## 📱 Components

### 1. Tasbeh Counter

- Beautiful counter interface
- Haptic feedback on tap
- Reset functionality
- Cycle tracking

### 2. Dhikr Selector

- Pre-defined dhikr options
- Custom dhikr creation
- Arabic text support
- Target count setting

### 3. Prayer Times

- Location-based prayer times
- Next prayer highlight
- Time remaining display
- Prayer name in Arabic

### 4. Qibla Compass

- Device orientation support
- Smooth compass animation
- Degree display
- Permission handling

### 5. Hijri Date

- Current Hijri date display
- Gregorian date conversion
- Beautiful typography

## 🔧 Development

### Project Structure

```
src/
├── components/     # React components
├── utils/         # Utility functions
├── types/         # TypeScript type definitions
├── assets/        # Static assets
└── App.tsx        # Main application component
```

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

## 🌐 Telegram Integration

The application uses the Telegram WebApp SDK for seamless integration:

```typescript
import WebApp from "@twa-dev/sdk";

// Initialize Telegram WebApp
WebApp.ready();

// Get user data
const user = WebApp.initDataUnsafe.user;
```

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Telegram for the WebApp platform
- React and TypeScript communities
- All contributors and users

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

Made with ❤️ for the Muslim community
