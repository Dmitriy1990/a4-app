import { IconStar } from '@/assets';
import { useTimer } from '@/hooks/useTimer';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setDiscountActive } from '@/store/timerSlice';

export const TimerComponent = () => {
  const dispatch = useDispatch();

  const { seconds, running } = useTimer({
    initial: 120,
    countdown: true,
    autoStart: true,
    onComplete: () => {
      dispatch(setDiscountActive(false));
    },
  });

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="flex flex-col items-center justify-center bg-green py-2 transition-all duration-500">
      <p className="font-semibold text-[14px] sm375:text-[18px] sm:text-[24px]">
        Успейте открыть пробную неделю
      </p>
      <div
        className={`flex items-center gap-2 transition-colors duration-300 ${
          seconds <= 30 ? 'text-tomato' : 'text-yellow'
        } ${seconds <= 30 && running ? 'animate-blink' : ''}`}>
        <IconStar />
        <div
          className={`flex items-center gap-1.5 text-[28px] sm375:text-[32px] sm:text-[40px] leading-[110%] font-bold tracking-tight tabular-nums`}>
          <span className="min-w-[35px] sm:min-w-[52px] text-center">
            {String(minutes).padStart(2, '0')}
          </span>
          <span className="mb-1">:</span>
          <span className="min-w-[35px] sm:min-w-[52px] text-center">
            {String(remainingSeconds).padStart(2, '0')}
          </span>
        </div>
        <IconStar />
      </div>
    </div>
  );
};
