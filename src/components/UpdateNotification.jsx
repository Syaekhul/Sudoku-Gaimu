import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

const UpdateNotification = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setShowUpdate(true);
              setRegistration(reg);
            }
          });
        });
      });
    }
  }, []);

  const handleUpdate = () => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    }
  };

  if (!showUpdate) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50">
      <div className="bg-indigo-600 text-white rounded-lg shadow-2xl p-4">
        <div className="flex items-start gap-3">
          <RefreshCw className="w-6 h-6 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold mb-1">Update Available!</h3>
            <p className="text-sm text-indigo-100 mb-3">
              A new version of Sudoku Gaimu is ready.
            </p>
            <button
              onClick={handleUpdate}
              className="w-full bg-white text-indigo-600 py-2 px-4 rounded-lg hover:bg-indigo-50 transition-all font-semibold"
            >
              Update Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateNotification;
