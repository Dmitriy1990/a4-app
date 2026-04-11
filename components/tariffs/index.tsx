import { IconAlert, imgMan } from '@/assets';
import Image from 'next/image';
import React, { useState } from 'react';
import { Checkbox } from '../checkbox';
import { Button } from '../button';
import { PriceSlot } from '../price-slot';
import { Spinner } from '../spinner';
import { useGetTariffsQuery } from '@/store/services/apiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import clsx from 'clsx';
import { formatPrice } from '@/utils/format';

export const Tariffs = () => {
  const { data: tariffs = [], isLoading, isError, refetch } = useGetTariffsQuery();
  const isDiscountActive = useSelector((state: RootState) => state.timer.isDiscountActive);

  const [isChecked, setIsChecked] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectTariffId, setSelectTariffId] = useState('');

  const bestTariff = tariffs.find((t) => t.is_best);
  const otherTariffs = tariffs.filter((t) => !t.is_best);

  const selectedId = selectTariffId || (bestTariff ? bestTariff.id + bestTariff.text : '');

  const handleBuyClick = () => {
    if (!isChecked) {
      setHasError(true);
    } else {
      setHasError(false);
      // Logic for purchase would go here in production
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
    if (!isChecked) {
      setHasError(false);
    }
  };

  const handleTariffKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectTariffId(id);
    }
  };

  return (
    <section
      aria-labelledby="tariffs-title"
      className="max-w-319 mx-auto px-4 sm:px-7.5 py-[20px] sm:py-[43px] pb-[22px] sm375:pb-[24px]">
      <h2
        id="tariffs-title"
        className="text-[22px] leading-[110%] sm375:text-[24px] sm:text-[40px] font-bold sm:mb-[101px] mb-[24px] sm375:mb-[20px]">
        Выбери подходящий для себя <span className="text-orange">тариф</span>
      </h2>
      <div className="flex items-center flex-col xl:flex-row xl:gap-[87px] sm:mb-[67px] mb-[22px] sm375:mb-[24px]">
        <Image
          src={imgMan}
          className="max-w-[99px] sm375:max-w-[124px] md:max-w-[380px] h-auto"
          alt="Иллюстрация человека"
          loading="eager"
        />
        <div className="flex flex-col items-center xl:items-start">
          <div
            className="max-w-[748px]  w-full mb-5 min-h-[300px] flex flex-col"
            role="radiogroup"
            aria-labelledby="tariffs-title">
            {isLoading ? (
              <div className="flex-1 flex items-center justify-center" aria-live="polite">
                <Spinner size="lg" />
              </div>
            ) : isError ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-grey-600 rounded-[20px] border border-tomato">
                <p className="text-tomato font-medium mb-4">Не удалось загрузить тарифы</p>
                <Button onClick={() => refetch()} className="max-w-[200px]">
                  Попробовать снова
                </Button>
              </div>
            ) : (
              <>
                {bestTariff && (
                  <div
                    role="radio"
                    aria-checked={selectedId === bestTariff.id + bestTariff.text}
                    tabIndex={0}
                    onKeyDown={(e) => handleTariffKeyDown(e, bestTariff.id + bestTariff.text)}
                    onClick={() => setSelectTariffId(bestTariff.id + bestTariff.text)}
                    className={clsx(
                      'mb-[6px] sm375:mb-[8px] sm:mb-[14px] bg-grey-600 rounded-[20px] sm:rounded-4xl border-[2px] px-[20px] py-[18px] sm:py-2.5 sm:px-5 relative cursor-pointer overflow-hidden transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-orange',
                      selectedId === bestTariff.id + bestTariff.text
                        ? 'border-orange'
                        : 'border-olive',
                    )}>
                    <span
                      className={clsx(
                        'absolute top-0 right-[62px] sm:right-auto sm:left-[50px] z-20 bg-amber py-[3px] px-[5px] inline-block rounded-b-[8px] text-[22px] font-medium transition-all duration-500',
                        !isDiscountActive && 'translate-y-[-100%] opacity-0',
                      )}>
                      -{Math.round(100 - (bestTariff.price / bestTariff.full_price) * 100)}%
                    </span>
                    <div className="text-orange text-right font-medium text-[13px] sm375:text-[16px] sm:text-[22px] leading-[130%] tracking-[0.03em] absolute top-[10px] right-[20px]">
                      хит!
                    </div>
                    <div className="flex gap-[30px] sm:gap-[40px] sm375:gap-[50px] items-center justify-center sm:mt-[17px] sm:ml-[40px] sm:mb-[10px]">
                      <div className="inline-flex flex-col items-center sm:min-h-[140px] justify-center">
                        <span className="font-medium text-[16px] sm375:text-[18px] sm:text-[26px] leading-[120%] mb-3">
                          {bestTariff.period}
                        </span>
                        <PriceSlot
                          value={isDiscountActive ? bestTariff.price : bestTariff.full_price}
                          className="text-orange font-semibold text-[30px] sm375:text-[34px] sm:text-[50px] leading-none"
                        />
                        <span
                          className={clsx(
                            'text-stone font-normal text-[14px] sm375:text-[16px] sm:text-[24px] leading-[120%] self-end relative mt-1 transition-opacity duration-500',
                            !isDiscountActive && 'opacity-0',
                          )}>
                          {formatPrice(bestTariff.full_price)} ₽
                          <span
                            className="absolute top-[50%] left-0 z-10 h-[2px] w-full bg-stone"
                            aria-hidden="true"></span>
                        </span>
                      </div>
                      <p className="max-w-[328px] sm:mt-0 mt-[30px] w-full text-[14px] sm:text-[16px] leading-[130%]">
                        {bestTariff.text}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex flex-col md:flex-row sm:gap-[14px] gap-[6px] sm375:gap-[8px]">
                  {otherTariffs.reverse().map((tariff) => (
                    <div
                      key={tariff.id}
                      role="radio"
                      aria-checked={selectTariffId === tariff.id}
                      tabIndex={0}
                      onKeyDown={(e) => handleTariffKeyDown(e, tariff.id)}
                      onClick={() => setSelectTariffId(tariff.id)}
                      className={clsx(
                        'flex-1 flex flex-row sm:flex-col gap-[30px] sm:gap-0  bg-grey-600 border-[2px] rounded-[20px] sm:rounded-[40px] px-[20px] py-[18px] sm:py-[23px] sm:px-[18px] relative cursor-pointer flex flex-col items-center overflow-hidden transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-orange',
                        selectTariffId === tariff.id ? 'border-orange' : 'border-olive',
                      )}>
                      <span
                        className={clsx(
                          'absolute top-0 right-[28px] md:right-auto sm375:right-[30px] md:left-[50px] bg-amber py-[2px] px-[8px] inline-block rounded-b-[7px] sm:rounded-b-[8px] text-[22px] font-medium transition-all duration-500',
                          !isDiscountActive && 'translate-y-[-100%] opacity-0',
                        )}>
                        -{Math.round(100 - (tariff.price / tariff.full_price) * 100)}%
                      </span>
                      <div className="flex flex-col items-center sm:mt-[37px] sm:mb-[40px] sm:min-h-[160px] justify-center">
                        <span className="font-medium text-[16px] sm375:text-[18px] sm:text-[26px] leading-[120%] mb-[12px] sm:mb-[30px]">
                          {tariff.period}
                        </span>
                        <PriceSlot
                          value={isDiscountActive ? tariff.price : tariff.full_price}
                          className="font-semibold  text-[30px] sm375:text-[34px] sm:text-[50px] leading-none"
                        />
                        <span
                          className={clsx(
                            'text-stone font-normal text-[14px] sm375:text-[16px] sm:text-[24px] leading-[120%] self-end relative mt-1 transition-opacity duration-500',
                            !isDiscountActive && 'opacity-0',
                          )}>
                          {formatPrice(tariff.full_price)} ₽
                          <span
                            className="absolute top-[50%] left-0 z-10 h-[2px] w-full bg-stone"
                            aria-hidden="true"></span>
                        </span>
                      </div>
                      <p className="text-[14px] sm:text-[16px] leading-[130%] mb-[5px] sm:mt-0 mt-[20px]">
                        {tariff.text}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div
            className="flex bg-grey-600 gap-[8px] max-w-[499px] rounded-[20px] px-[12px] py-[14px] sm:px-5 sm:py-[18px] bg-amber mb-[30px]"
            role="alert">
            <div className="w-[24px]">
              <IconAlert />
            </div>
            <p className="text-[12px] sm:text-[16px] leading-[130%]">
              Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1
              месяц
            </p>
          </div>
          <Checkbox
            className="mb-4"
            checked={isChecked}
            onChange={handleCheckboxChange}
            isError={hasError}>
            <p className="max-w-[650px] text-grey-100 font-normal text-[12px] sm:text-[16px] leading-[110%] ml-[12px]">
              Я согласен с{' '}
              <a href="#" className="underline">
                офертой рекуррентных платежей
              </a>{' '}
              и{' '}
              <a href="#" className="underline">
                Политикой конфиденциальности
              </a>
            </p>
          </Checkbox>
          <Button
            className=" sm:max-w-[352px] mb-4 animate-blink"
            fullWidth
            onClick={handleBuyClick}>
            Купить
          </Button>
          <p className="font-normal text-[10px] sm:text-[14px] leading-[120%] text-[#9B9B9B]">
            Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств
            для получения пожизненного доступа к приложению. Пользователь соглашается, что данные
            кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг
            сервиса в случае желания пользователя.
          </p>
        </div>
      </div>
      <div className="p-3 sm:p-5 rounded-[30px] border border-olive">
        <div className="border border-light-green rounded-[30px] max-w-[461px] px-[14px] sm:px-[28px] py-[12px] sm:py-[16px] mb-[10px] sm:mb-[30px] inline-block">
          <span className="text-light-green font-medium text-[16px] sm375:text-[18px] sm:text-[28px] leading-[120%]">
            гарантия возврата 30 дней
          </span>
        </div>
        <p className="text-light-grey text-[13px] sm375:text-[14px] sm:text-[24px] leading-[130%]">
          Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4
          недели! Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки,
          если ты не получишь видимых результатов.
        </p>
      </div>
    </section>
  );
};
