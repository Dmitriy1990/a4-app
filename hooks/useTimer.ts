'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type UseTimerOptions = {
  initial?: number;
  countdown?: boolean;
  interval?: number;
  autoStart?: boolean;
  onComplete?: () => void;
};

export function useTimer(options?: UseTimerOptions) {
  const {
    initial = 60,
    countdown = true,
    interval = 1000,
    autoStart = false,
    onComplete,
  } = options || {};
  const [seconds, setSeconds] = useState(initial);
  const [running, setRunning] = useState(autoStart);
  const initialRef = useRef(initial);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    initialRef.current = initial;
  }, [initial]);

  const tick = useCallback(() => {
    setSeconds((prev) => {
      const next = countdown ? prev - 1 : prev + 1;
      return countdown && next <= 0 ? 0 : next;
    });
  }, [countdown]);

  useEffect(() => {
    if (countdown && seconds <= 0 && running) {
      const timeoutId = setTimeout(() => {
        setRunning(false);
        if (onComplete) onComplete();
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [seconds, countdown, running, onComplete]);

  useEffect(() => {
    if (running && timerRef.current == null) {
      timerRef.current = window.setInterval(tick, interval);
    }
    if (!running && timerRef.current != null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current != null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [running, interval, tick]);

  const start = useCallback(() => setRunning(true), []);
  const pause = useCallback(() => setRunning(false), []);
  const reset = useCallback((value?: number) => {
    setRunning(false);
    const v = value ?? initialRef.current;
    setSeconds(v);
  }, []);
  const set = useCallback((value: number) => setSeconds(value), []);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return { seconds, running, start, pause, reset, set, formatted };
}
