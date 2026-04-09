'use client';

import * as React from 'react';
import clsx from 'clsx';
import { Tariff } from '@/store/services/apiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { formatPrice } from '@/utils/format';

interface TariffCardProps {
  tariff: Tariff;
  isBestOffer?: boolean;
}

export const TariffCard: React.FC<TariffCardProps> = ({ tariff, isBestOffer }) => {
  const isDiscountActive = useSelector((state: RootState) => state.timer.isDiscountActive);

  return (
    <div
      className={clsx(
        'bg-grey-600 border-[2px] rounded-[40px] py-[23px] px-[18px] relative cursor-pointer flex flex-col items-center overflow-hidden transition-all duration-500',
        isBestOffer ? 'border-olive' : 'border-transparent',
      )}>
      {isBestOffer && (
        <span
          className={clsx(
            'absolute top-0 left-[50px] z-20 bg-amber py-[5px] px-[8px] inline-block rounded-b-[8px] text-[22px] font-medium transition-all duration-500',
            !isDiscountActive && 'translate-y-[-100%] opacity-0',
          )}>
          -{Math.round(100 - (tariff.price / tariff.full_price) * 100)}%
        </span>
      )}
      {isBestOffer && (
        <div className="text-orange text-right font-medium text-[22px] leading-[130%] tracking-[0.03em]">
          хит!
        </div>
      )}
      <div className="flex flex-col items-center mt-[50px] mb-[40px] min-h-[160px] justify-center">
        <span className="font-medium text-[26px] leading-[120%] mb-3">{tariff.period}</span>
        <div className="text-orange font-semibold text-[50px] leading-none">
          {formatPrice(isDiscountActive ? tariff.price : tariff.full_price)}
        </div>
        <span
          className={clsx(
            'text-stone font-normal text-[24px] leading-[120%] self-end relative mt-1 transition-opacity duration-500',
            !isDiscountActive && 'opacity-0',
          )}>
          {formatPrice(tariff.full_price)} ₽
          <span className="absolute top-[50%] left-0 z-10 h-[2px] w-full bg-stone"></span>
        </span>
      </div>
      <p className="text-[16px] leading-[130%]">{tariff.text}</p>
    </div>
  );
};
