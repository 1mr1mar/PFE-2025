import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Sparkles } from 'lucide-react';

const ThemeSwitcher = () => {
  const { currentTheme, changeTheme, themes } = useTheme();

  const handleThemeChange = (event) => {
    const newTheme = event.target.value;
    changeTheme(newTheme);
  };

  const getThemeIcon = (themeName) => {
    switch(themeName) {
      case 'light':
        return <Sun className="w-2.5 h-2.5 sm:w-3 sm:h-3" />;
      case 'dark':
        return <Moon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />;
      case 'nature':
        return <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />;
      default:
        return <Sun className="w-2.5 h-2.5 sm:w-3 sm:h-3" />;
    }
  };

  return (
    <div className="fixed top-0 right-16 sm:top-2 sm:right-6 md:top-2 md:right-8 lg:top-2 lg:right-10 z-[9999]">
      <div className="relative group">
        <div className="absolute inset-0 bg-[var(--line-theme)]/20 blur-lg rounded-full transform group-hover:scale-110 transition-all duration-300 hidden sm:block"></div>
        <div className="relative bg-transparent sm:bg-[var(--bg1-theme)] p-1 sm:p-1 rounded-full shadow-lg border-0 sm:border border-[var(--line-theme)]/30 sm:backdrop-blur-sm">
          <select
            value={currentTheme}
            onChange={handleThemeChange}
            className="appearance-none bg-transparent text-[var(--text-theme)] pl-5 pr-6 sm:pl-6 sm:pr-8 py-1 sm:py-1.5 text-xs sm:text-sm focus:outline-none cursor-pointer"
          >
            {Object.entries(themes).map(([themeKey, theme]) => (
              <option 
                key={themeKey} 
                value={themeKey}
                className="bg-[var(--bg-theme)] text-[var(--text-theme)]"
              >
                {theme.name}
              </option>
            ))}
          </select>
          <div className="absolute left-1 sm:left-1.5 top-1/2 -translate-y-1/2 text-[var(--line-theme)]">
            {getThemeIcon(currentTheme)}
          </div>
          <div className="absolute right-1 sm:right-1.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[var(--line-theme)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher; 