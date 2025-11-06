import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en', // default language on first load
    fallbackLng: 'en', // fallback if translation not available
    resources: {
      en: {
        translation: {
          welcome: "Welcome to Career Copilot",
          send: "Send",
          placeholder: "Type your question...",
          clear: "Clear All",
          hideSidebar: "Hide Sidebar",
          showSidebar: "Show Sidebar",
          darkMode: "Dark Mode",
          lightMode: "Light Mode",
          newChat: "New Chat",
          defaultChat: "Default Chat",
          hiUser: "Hi User"
        }
      },
      hi: {
        translation: {
          welcome: "करियर कोपायलट में आपका स्वागत है",
          send: "भेजें",
          placeholder: "अपना प्रश्न टाइप करें...",
          clear: "सभी साफ़ करें",
          hideSidebar: "साइडबार छिपाएँ",
          showSidebar: "साइडबार दिखाएँ",
          darkMode: "डार्क मोड",
          lightMode: "लाइट मोड",
          newChat: "नई चैट",
          defaultChat: "डिफ़ॉल्ट चैट",
          hiUser: "नमस्ते उपयोगकर्ता"
        }
      },
      te: {
        translation: {
          welcome: "కెరీర్ కోపైలట్‌కు స్వాగతం",
          send: "పంపించు",
          placeholder: "మీ ప్రశ్నను టైప్ చేయండి...",
          clear: "అన్నీ క్లియర్ చేయి",
          hideSidebar: "సైడ్‌బార్ దాచు",
          showSidebar: "సైడ్‌బార్ చూపించు",
          darkMode: "డార్క్ మోడ్",
          lightMode: "లైట్ మోడ్",
          newChat: "కొత్త చాట్",
          defaultChat: "డిఫాల్ట్ చాట్",
          hiUser: "హాయ్ యూజర్"
        }
      }
    },
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;