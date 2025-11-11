import { useState, useEffect, useRef } from "react";

const useTimer = (isActive, isPaused) => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused]);

  const reset = () => {
    setSeconds(0);
  };

  const setTime = (time) => {
    setSeconds(time);
  };

  return { seconds, reset, setTime };
};

export default useTimer;
