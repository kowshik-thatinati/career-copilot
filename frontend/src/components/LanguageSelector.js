import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/LanguageSelector.css';

function LanguageSelector() {
  const { i18n } = useTranslation();

  // Supported languages with their display names
  const supportedLanguages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh-cn', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ];

  const handleChange = (e) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
    localStorage.setItem('selectedLanguage', selectedLang);
  };

  // Get current language or default to 'en'
  const currentLang = i18n.language || 'en';

  return (
    <div className="language-selector-wrapper">
      <select 
        className="language-selector" 
        value={currentLang} 
        onChange={handleChange} 
        aria-label="Select language"
      >
        {supportedLanguages.map(({ code, name, flag }) => (
          <option key={code} value={code}>
            {flag} {name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;
