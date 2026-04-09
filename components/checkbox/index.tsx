import { IconCheck } from '@/assets';
import clsx from 'clsx';
import type { ChangeEvent, FC, ReactElement, ReactNode } from 'react';
import { useEffect, useRef } from 'react';

type Props = {
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  indeterminate?: boolean;
  label?: string;
  value?: string;
  name?: string;
  children?: ReactNode;
  bgColor?: string;
  disabled?: boolean;
  className?: string;
  isError?: boolean;
};

export const Checkbox: FC<Props> = (props: Props): ReactElement => {
  const { checked, onChange, indeterminate, name, children, disabled, className, isError } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = inputRef.current;
    if (el) {
      el.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate, checked]);

  return (
    <label className={clsx('relative flex cursor-pointer items-center', className)}>
      <div className="relative flex h-8 w-8 flex-none items-center justify-center">
        <input
          ref={inputRef}
          className="peer absolute inset-0 z-20 cursor-pointer opacity-0"
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <span
          className={clsx(
            'absolute inset-0 block rounded-[4px] border-[1.5px] bg-transparent transition-all',
            isError && !checked ? 'border-tomato' : 'border-[#606566]',
            'peer-checked:border-grey-100 peer-checked:bg-primary',
            'peer-indeterminate:border-grey-100 peer-indeterminate:bg-primary',
            'peer-indeterminate:after:absolute peer-indeterminate:after:left-1/2 peer-indeterminate:after:top-1/2 peer-indeterminate:after:h-[2px] peer-indeterminate:after:w-[10px] peer-indeterminate:after:-translate-x-1/2 peer-indeterminate:after:-translate-y-1/2 peer-indeterminate:after:bg-white peer-indeterminate:after:content-[""]',
          )}
        />
        <div className="pointer-events-none z-10 hidden peer-checked:block">
          <IconCheck />
        </div>
      </div>
      {children}
    </label>
  );
};
