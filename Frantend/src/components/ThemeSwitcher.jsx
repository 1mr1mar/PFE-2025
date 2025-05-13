import React, { useEffect } from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';

const ThemeSwitcher = () => {
  const [theme, setTheme] = React.useState(() => {
    const savedTheme = localStorage.getItem('theme') || 'white-gold-theme';
    console.log('Initial theme loaded:', savedTheme);
    return savedTheme;
  });

  useEffect(() => {
    // Apply the theme when component mounts
    console.log('Component mounted, applying theme:', theme);
    applyTheme(theme);
  }, []);

  const applyTheme = (newTheme) => {
    console.log('Applying theme:', newTheme);
    
    // Remove all theme classes from both html and body
    document.documentElement.classList.remove('black-gold-theme', 'white-gold-theme', 'green-gold-theme');
    document.body.classList.remove('black-gold-theme', 'white-gold-theme', 'green-gold-theme');
    
    console.log('Removed theme classes');
    console.log('Current html classes:', document.documentElement.classList);
    console.log('Current body classes:', document.body.classList);
    
    // Add the selected theme class to both html and body
    document.documentElement.classList.add(newTheme);
    document.body.classList.add(newTheme);
    
    console.log('Added new theme classes');
    console.log('New html classes:', document.documentElement.classList);
    console.log('New body classes:', document.body.classList);
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', newTheme);
    console.log('Theme saved to localStorage:', newTheme);
  };

  const toggleTheme = (newTheme) => {
    console.log('Theme toggle clicked:', newTheme);
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <div className="fixed bottom-6 right-6 flex gap-2 bg-black/10 backdrop-blur-md p-3 rounded-full shadow-lg z-[9999]">
      <button
        onClick={() => toggleTheme('white-gold-theme')}
        className={`p-2 rounded-full transition-all duration-300 ${
          theme === 'white-gold-theme' 
            ? 'bg-[#C9A54E] text-white' 
            : 'hover:bg-[#C9A54E]/20 text-[#C9A54E]'
        }`}
        title="White & Gold Theme"
      >
        <Sun size={20} />
      </button>
      <button
        onClick={() => toggleTheme('black-gold-theme')}
        className={`p-2 rounded-full transition-all duration-300 ${
          theme === 'black-gold-theme' 
            ? 'bg-[#F5E3C1] text-black' 
            : 'hover:bg-[#F5E3C1]/20 text-[#F5E3C1]'
        }`}
        title="Black & Gold Theme"
      >
        <Moon size={20} />
      </button>
      <button
        onClick={() => toggleTheme('green-gold-theme')}
        className={`p-2 rounded-full transition-all duration-300 ${
          theme === 'green-gold-theme' 
            ? 'bg-[#C9A54E] text-white' 
            : 'hover:bg-[#C9A54E]/20 text-[#C9A54E]'
        }`}
        title="Green & Gold Theme"
      >
        <Sparkles size={20} />
      </button>
    </div>
  );
};

export default ThemeSwitcher; 