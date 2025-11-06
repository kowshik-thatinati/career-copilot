import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('selectedLanguage') || 'en',
    fallbackLng: 'en',
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
      },
      es: {
        translation: {
          welcome: "Bienvenido a Career Copilot",
          send: "Enviar",
          placeholder: "Escribe tu pregunta...",
          clear: "Borrar todo",
          hideSidebar: "Ocultar barra lateral",
          showSidebar: "Mostrar barra lateral",
          darkMode: "Modo oscuro",
          lightMode: "Modo claro",
          newChat: "Nuevo chat",
          defaultChat: "Chat predeterminado",
          hiUser: "Hola usuario"
        }
      },
      fr: {
        translation: {
          welcome: "Bienvenue sur Career Copilot",
          send: "Envoyer",
          placeholder: "Tapez votre question...",
          clear: "Tout effacer",
          hideSidebar: "Masquer la barre latérale",
          showSidebar: "Afficher la barre latérale",
          darkMode: "Mode sombre",
          lightMode: "Mode clair",
          newChat: "Nouveau chat",
          defaultChat: "Chat par défaut",
          hiUser: "Bonjour utilisateur"
        }
      },
      de: {
        translation: {
          welcome: "Willkommen bei Career Copilot",
          send: "Senden",
          placeholder: "Geben Sie Ihre Frage ein...",
          clear: "Alles löschen",
          hideSidebar: "Seitenleiste ausblenden",
          showSidebar: "Seitenleiste anzeigen",
          darkMode: "Dunkler Modus",
          lightMode: "Heller Modus",
          newChat: "Neuer Chat",
          defaultChat: "Standard-Chat",
          hiUser: "Hallo Benutzer"
        }
      },
      'zh-cn': {
        translation: {
          welcome: "欢迎使用Career Copilot",
          send: "发送",
          placeholder: "输入您的问题...",
          clear: "清除所有",
          hideSidebar: "隐藏侧边栏",
          showSidebar: "显示侧边栏",
          darkMode: "深色模式",
          lightMode: "浅色模式",
          newChat: "新聊天",
          defaultChat: "默认聊天",
          hiUser: "你好用户"
        }
      },
      ja: {
        translation: {
          welcome: "Career Copilotへようこそ",
          send: "送信",
          placeholder: "質問を入力してください...",
          clear: "すべてクリア",
          hideSidebar: "サイドバーを非表示",
          showSidebar: "サイドバーを表示",
          darkMode: "ダークモード",
          lightMode: "ライトモード",
          newChat: "新しいチャット",
          defaultChat: "デフォルトチャット",
          hiUser: "こんにちはユーザー"
        }
      },
      ko: {
        translation: {
          welcome: "Career Copilot에 오신 것을 환영합니다",
          send: "보내기",
          placeholder: "질문을 입력하세요...",
          clear: "모두 지우기",
          hideSidebar: "사이드바 숨기기",
          showSidebar: "사이드바 표시",
          darkMode: "다크 모드",
          lightMode: "라이트 모드",
          newChat: "새 채팅",
          defaultChat: "기본 채팅",
          hiUser: "안녕하세요 사용자"
        }
      },
      ar: {
        translation: {
          welcome: "مرحبًا بك في Career Copilot",
          send: "إرسال",
          placeholder: "اكتب سؤالك...",
          clear: "مسح الكل",
          hideSidebar: "إخفاء الشريط الجانبي",
          showSidebar: "إظهار الشريط الجانبي",
          darkMode: "الوضع الداكن",
          lightMode: "الوضع الفاتح",
          newChat: "محادثة جديدة",
          defaultChat: "المحادثة الافتراضية",
          hiUser: "مرحبا المستخدم"
        }
      },
      pt: {
        translation: {
          welcome: "Bem-vindo ao Career Copilot",
          send: "Enviar",
          placeholder: "Digite sua pergunta...",
          clear: "Limpar tudo",
          hideSidebar: "Ocultar barra lateral",
          showSidebar: "Mostrar barra lateral",
          darkMode: "Modo escuro",
          lightMode: "Modo claro",
          newChat: "Novo chat",
          defaultChat: "Chat padrão",
          hiUser: "Olá usuário"
        }
      },
      ru: {
        translation: {
          welcome: "Добро пожаловать в Career Copilot",
          send: "Отправить",
          placeholder: "Введите ваш вопрос...",
          clear: "Очистить все",
          hideSidebar: "Скрыть боковую панель",
          showSidebar: "Показать боковую панель",
          darkMode: "Темный режим",
          lightMode: "Светлый режим",
          newChat: "Новый чат",
          defaultChat: "Чат по умолчанию",
          hiUser: "Привет пользователь"
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