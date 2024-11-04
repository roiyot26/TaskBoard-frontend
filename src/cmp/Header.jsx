import { useTranslation } from 'react-i18next'

export function Header() {
  const { t, i18n } = useTranslation()
  const lngs = {
    en: { nativeName: 'English' },
    es: { nativeName: 'Spanish' },
  }
  return (
    <div className='header'>
      {t('taskBoard')}
      <div className='button-group'>
        {Object.keys(lngs).map(lng => (
          <button
            type="submit"
            key={lng}
            onClick={() => i18n.changeLanguage(lng)}
            disabled={i18n.resolvedLanguage === lng}
          >
            {lngs[lng].nativeName}
          </button>
        ))}
      </div>
    </div>

  )
}
