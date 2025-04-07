import WebApp from "@twa-dev/sdk";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const handleShare = () => {
    const shareData = {
      title: "Tasbeh Counter",
      text: "Check out this amazing Tasbeh Counter app!",
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      WebApp.showAlert("Please share this link: " + window.location.href);
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
          <button onClick={onStart} className="btn btn-primary w-full">
            Start Counting
          </button>

          <button onClick={handleShare} className="btn btn-secondary w-full">
            Share with Friends
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
