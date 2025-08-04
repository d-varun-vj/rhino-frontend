import { useChangeUserLanguage } from '@rhino/apis';
import message from 'apps/webapp/src/components/notifier';
import { useTranslation } from 'react-i18next';

const LanguageButton = ({
  languageName,
  handleClick,
}: {
  languageName: string;
  handleClick: (languageName: string) => void;
}) => {
  const { i18n } = useTranslation();

  return (
    <button
      type="button"
      className={`w-[35px] h-[35px] flex justify-center items-center rounded-[50%] bg-rhino-white mr-[10px] cursor-pointer hover:text-rhino-indigo-blue-light ${languageName.toLowerCase() === i18n.language ? 'text-rhino-indigo-blue border-[2px] border-rhino-indigo-blue' : 'text-black  border-black opacity-[0.2]'}`}
      onClick={() => handleClick(languageName)}
    >
      {languageName.toUpperCase()}
    </button>
  );
};

const Language = () => {
  const { t, i18n } = useTranslation('layout');
  const { t: tCommon } = useTranslation('common');
  const changeLanguage = i18n.changeLanguage.bind(i18n);

  const { mutate } = useChangeUserLanguage();

  const handleClick = (languageName: string) => {
    mutate(
      { lang: languageName.toLowerCase() },
      {
        onSuccess: () => {
          changeLanguage(languageName.toLowerCase())
            .then(() => {
              message.success(tCommon('toast.languageChanged.success'));
            })
            .catch(() => {
              message.error(tCommon('toast.somethingWentWrong'));
            });
        },
        onError: () => {
          message.error(tCommon('toast.somethingWentWrong'));
        },
      }
    );
  };

  return (
    <div className="flex justify-between flex-row py-3 px-6">
      <p className="mt-0 mb-[1rem]">
        <label className="pt-[5px] leading-[1.47] inline-block">
          {t('topRibbon.user.language.label')}
        </label>
      </p>
      <div className="">
        <div className="pl-8 flex ">
          <LanguageButton languageName={'EN'} handleClick={handleClick} />
          <LanguageButton languageName={'PL'} handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default Language;
