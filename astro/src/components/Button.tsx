import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  className?: string;
  children: React.ReactNode;
}

// Utility function to merge Tailwind classes
const cn = (...inputs: any) => twMerge(clsx(inputs));

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary',
  className,
  children,
  ...props 
}) => {
  return (
    <button
      className={cn(
        // Base styles
        'text-main rounded-[8px] transition-colors duration-300',
        'px-6 py-2',
        
        // Variant styles
        variant === 'primary' && [
          'bg-[#00FF88]',
          'text-black',
          '',
          'hover:bg-white hover:text-black'
        ],
        
        // Allow custom classes to override defaults
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;