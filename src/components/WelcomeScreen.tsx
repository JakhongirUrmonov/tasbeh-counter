// interface WelcomeScreenProps {
//   onStart: () => void;
// }

interface TelegramWebApp {
  WebApp: {
    openTelegramLink: (url: string) => void;
    showPopup?: (options: { message: string }) => void;
    initDataUnsafe?: {
      user?: {
        id: number;
        username?: string;
      };
    };
  };
}

declare global {
  interface Window {
    Telegram?: TelegramWebApp;
  }
}

export function WelcomeScreen() {
  const shareProgress = async () => {
    const tgUser = window?.Telegram?.WebApp.initDataUnsafe?.user;

    if (!tgUser) {
      alert("Telegram user info not found.");
      return;
    }

    const zikrCount = localStorage.getItem("tasbehCount"); // from your state
    const username = tgUser.username || "User";

    try {
      await fetch(`https://b8b9-109-81-169-164.ngrok-free.app/share/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telegramId: tgUser.id,
          username,
          zikrCount,
        }),
      });

      window?.Telegram?.WebApp?.showPopup?.({
        message: "Shared successfully in your chat!",
      });
    } catch (err) {
      window?.Telegram?.WebApp?.showPopup?.({
        message: "Failed to share your progress 😔: " + err,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="card max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold text-primary">
          Welcome to Tasbeh Counter
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Start counting your dhikr and track your daily spiritual journey
        </p>

        <div className="space-y-4">
          <button className="btn btn-primary w-full">Start Counting</button>

          <button onClick={shareProgress} className="btn btn-secondary w-full">
            Share with Friends1
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>Features:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Track your daily dhikr</li>
            <li>Multiple dhikr options</li>
            <li>Prayer times</li>
            <li>Qibla direction</li>
            <li>Hijri calendar</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
