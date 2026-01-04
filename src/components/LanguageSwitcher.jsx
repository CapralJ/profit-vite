import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'ru', label: 'RU' },
  { code: 'kz', label: 'KZ' },
  { code: 'en', label: 'EN' }
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="language-switcher">
      <Globe size={18} />
      <div className="language-buttons">
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`lang-btn ${i18n.language === lang.code ? 'active' : ''}`}
            onClick={() => i18n.changeLanguage(lang.code)}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LanguageSwitcher;
