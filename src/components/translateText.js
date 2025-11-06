// src/utils/translateText.js
import { translate } from '@vitalets/google-translate-api';
import { getCode } from './languages';

export async function translateText(text, targetLang) {
  const langCode = getCode(targetLang);
  if (!langCode || langCode === 'en') return text;

  try {
    const res = await translate(text, { to: langCode });
    return res.text;
  } catch (err) {
    console.error('Translation failed:', err);
    return text;
  }
}