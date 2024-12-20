import React, { useEffect, useState } from 'react';
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
  const [isPartyMode, setIsPartyMode] = useState(false);

  useEffect(() => {
    const partyMode = document.getElementById('party-mode');
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsPartyMode(!partyMode?.classList.contains('hidden'));
        }
      });
    });

    if (partyMode) {
      observer.observe(partyMode, { attributes: true });
      setIsPartyMode(!partyMode.classList.contains('hidden'));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <button
      className={cn(
        // Base styles
        'text-main rounded-[8px] transition-colors duration-300',
        'px-6 py-2',
        
        // Party Mode
        isPartyMode && 'party-button text-white hover:brightness-110',
        
        // Regular Variant styles (when not in party mode)
        !isPartyMode && variant === 'primary' && [
          'bg-[#00FF88]',
          'text-black',
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