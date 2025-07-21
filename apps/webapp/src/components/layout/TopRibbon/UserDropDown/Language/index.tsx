import { useTranslation } from 'react-i18next';
import { useChangeUserLanguage } from '@rhino/apis';
import { toast } from 'react-toastify';

const LanguageButton = ({
  languageName,
  handleClick,
}: {
  languageName: string;
  handleClick: (languageName: string) => void;
}) => {
  const { i18n } = useTranslation();

  return (
    <div
      className={`w-[35px] h-[35px] flex justify-center items-center rounded-[50%] bg-rhino-white mr-[10px] cursor-pointer hover:text-rhino-indigo-blue-light ${languageName.toLowerCase() === i18n.language ? 'text-rhino-indigo-blue border-[2px] border-rhino-indigo-blue' : 'text-black  border-black opacity-[0.2]'}`}
      onClick={() => handleClick(languageName)}
    >
      {languageName.toUpperCase()}
    </div>
  );
};

const Language = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = i18n.changeLanguage.bind(i18n);

  const { mutate } = useChangeUserLanguage();

  const handleClick = (languageName: string) => {
    mutate(
      { lang: languageName.toLowerCase() },
      {
        onSuccess: () => {
          changeLanguage(languageName.toLowerCase())
            .then(() => {
              toast.success(t('toast.languageChanged.success'));
            })
            .catch(() => {
              toast.error(t('toast.somethingWantWrong'));
            });
        },
        onError: () => {
          toast.error(t('toast.somethingWantWrong'));
        },
      }
    );
  };

  return (
    <div className="flex justify-between flex-row py-[0.75rem] px-[1.5rem]">
      <p className="mt-0 mb-[1rem]">
        <label className="pt-[5px] leading-[1.47] inline-block">
          {t('topRibbon.user.language')}
        </label>
      </p>
      <div className="">
        <div className="pl-[2rem] flex ">
          <LanguageButton languageName={'EN'} handleClick={handleClick} />
          <LanguageButton languageName={'PL'} handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default Language;
