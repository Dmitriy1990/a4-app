'use client';

import React, { FC } from 'react';
import clsx from 'clsx';
import { formatPrice } from '@/utils/format';

interface PriceSlotProps {
  value: number;
  className?: string;
}

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const Digit: FC<{ digit: string }> = ({ digit }) => {
  const isDigit = /\d/.test(digit);

  if (!isDigit) {
    return (
      <span className={clsx('flex items-center justify-center', digit === ' ' ? 'w-[0.2em]' : 'w-[0.3em]')}>
        {digit}
      </span>
    );
  }

  const digitIndex = parseInt(digit, 10);

  return (
    <div className="relative w-[0.6em] h-[1em] overflow-hidden">
      <div
        className="transition-transform duration-700 ease-in-out flex flex-col items-center absolute left-0 right-0"
        style={{ transform: `translateY(-${digitIndex * 10}%)` }}>
        {DIGITS.map((d) => (
          <span
            key={d}
            className="h-[1em] w-full flex items-center justify-center leading-none shrink-0">
            {d}
          </span>
        ))}
      </div>
    </div>
  );
};

export const PriceSlot: FC<PriceSlotProps> = ({ value, className }) => {
  const valueString = formatPrice(value);
  const characters = valueString.split('');

  return (
    <div className={clsx('flex items-center tabular-nums justify-center leading-none', className)}>
      <div className="flex">
        {characters.map((char, index) => (
          <Digit key={`pos-${characters.length - 1 - index}`} digit={char} />
        ))}
      </div>
      <span className="ml-2">₽</span>
    </div>
  );
};
