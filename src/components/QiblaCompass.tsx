import { useState, useEffect } from "react";

interface QiblaCompassProps {
  onError: (message: string) => void;
}

interface DeviceOrientationEventWithPermission extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

export function QiblaCompass({ onError }: QiblaCompassProps) {
  const [direction, setDirection] = useState<number | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let watchId: number | null = null;

    const requestPermission = async () => {
      try {
        setIsLoading(true);
        const DeviceOrientationEventWithPermission =
          DeviceOrientationEvent as unknown as DeviceOrientationEventWithPermission;

        if (
          typeof DeviceOrientationEventWithPermission.requestPermission ===
          "function"
        ) {
          const permission =
            await DeviceOrientationEventWithPermission.requestPermission();
          if (permission === "granted") {
            setPermissionGranted(true);
          } else {
            onError("Permission to access device orientation was denied");
          }
        } else {
          setPermissionGranted(true);
        }
      } catch (error) {
        console.error("Error requesting permission:", error);
        onError("Error requesting device orientation permission");
      } finally {
        setIsLoading(false);
      }
    };

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        // Kaaba coordinates (21.4225° N, 39.8262° E)
        const kaabaLat = 21.4225;
        const kaabaLng = 39.8262;

        // Get user's current position
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            // Calculate Qibla direction
            const qiblaDirection = calculateQiblaDirection(
              userLat,
              userLng,
              kaabaLat,
              kaabaLng,
              event.alpha || 0
            );

            setDirection(qiblaDirection);
          },
          (error) => {
            onError("Error getting location: " + error.message);
          }
        );
      }
    };

    const calculateQiblaDirection = (
      userLat: number,
      userLng: number,
      kaabaLat: number,
      kaabaLng: number,
      alpha: number
    ): number => {
      const userLatRad = (userLat * Math.PI) / 180;
      const userLngRad = (userLng * Math.PI) / 180;
      const kaabaLatRad = (kaabaLat * Math.PI) / 180;
      const kaabaLngRad = (kaabaLng * Math.PI) / 180;

      const y = Math.sin(kaabaLngRad - userLngRad);
      const x =
        Math.cos(userLatRad) * Math.tan(kaabaLatRad) -
        Math.sin(userLatRad) * Math.cos(kaabaLngRad - userLngRad);

      let qiblaDirection = (Math.atan2(y, x) * 180) / Math.PI;
      qiblaDirection = (qiblaDirection + 360) % 360;

      // Adjust for device orientation
      return (qiblaDirection - alpha + 360) % 360;
    };

    if (permissionGranted) {
      watchId = window.addEventListener(
        "deviceorientation",
        handleOrientation as EventListener
      ) as unknown as number;
    }

    requestPermission();

    return () => {
      if (watchId !== null) {
        window.removeEventListener(
          "deviceorientation",
          handleOrientation as EventListener
        );
      }
    };
  }, [permissionGranted, onError]);

  if (!permissionGranted) {
    return (
      <button
        className={`permission-button ${isLoading ? "loading" : ""}`}
        onClick={() => setPermissionGranted(true)}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Enable Compass"}
      </button>
    );
  }

  return (
    <div className="compass-container">
      <div
        className="compass"
        style={{ transform: `rotate(${direction || 0}deg)` }}
      >
        <div className="compass-arrow">↑</div>
        <div className="compass-label">Qibla</div>
        <div className="compass-degree">
          {direction !== null ? `${Math.round(direction)}°` : "--"}
        </div>
      </div>
    </div>
  );
}
