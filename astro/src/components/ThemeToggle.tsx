import { useState, useEffect } from 'react';
import { $theme, setTheme } from '../utils/themeStore';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const unsubscribe = $theme.subscribe(theme => {
      setIsDark(theme === 'dark');
    });
    return () => unsubscribe();
  }, []);

  const handleClick = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <button
      onClick={handleClick}
      data-party-mode
      className="bg-white hover:bg-[#00FF88] text-black px-4 py-2 rounded-full shadow-lg transition-colors duration-300"
    >
      {isDark ? '🌞' : '🌙'}
    </button>
  );
}