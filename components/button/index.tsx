import clsx from 'clsx';
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary';
  size?: 'md';
  children: ReactNode;
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}) => {
  const variants = {
    primary: 'bg-orange text-[#191E1F] text-[20px]',
  };

  const sizes = {
    md: 'h-[66px] px-[40px] py-[20px] text-base',
  };

  return (
    <button
      className={clsx(
        'inline-flex items-center cursor-pointer justify-center rounded-[20px] font-bold transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}>
      {children}
    </button>
  );
};
