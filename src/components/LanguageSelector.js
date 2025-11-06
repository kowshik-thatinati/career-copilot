import React from 'react';
import { useTranslation } from 'react-i18next';
import langs from './languages'; // Your languages list

function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
  };

  return (
    <select value={i18n.language} onChange={handleChange} aria-label="Select language">
      {Object.entries(langs).map(([code, name]) => (
        <option key={code} value={code}>{name}</option>
      ))}
    </select>
  );
}

export default LanguageSelector;
