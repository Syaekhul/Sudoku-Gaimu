import { useState, useEffect } from "react";
import { WifiOff, Wifi } from "lucide-react";

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowNotification(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!showNotification) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
      <div
        className={`px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 ${
          isOnline ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        {isOnline ? (
          <>
            <Wifi size={20} />
            <span className="font-semibold">Back Online!</span>
          </>
        ) : (
          <>
            <WifiOff size={20} />
            <span className="font-semibold">You're Offline</span>
          </>
        )}
      </div>
    </div>
  );
};

export default OfflineIndicator;
