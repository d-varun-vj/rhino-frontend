import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { changeUserLanguage } from '../../../../../api/User';

const Langaugae = () => {
  const {
    t,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    i18n: { changeLanguage, language },
  } = useTranslation();
  const changeLanguageMutation = useMutation({
    mutationFn: changeUserLanguage,
  });

  const LanguageButton = ({ languageName }: { languageName: string }) => (
    <div
      className={`w-[35px] h-[35px] flex justify-center items-center rounded-[50%] bg-white mr-[10px] cursor-pointer hover:text-rhino-indigo-blue-light ${languageName.toLowerCase() === language ? 'text-rhino-indigo-blue border-[2px] border-rhino-indigo-blue' : 'text-black  border-black opacity-[0.2]'}`}
      onClick={() => {
        changeLanguageMutation.mutate(
          { lang: languageName.toLowerCase() },
          {
            onSuccess: () => {
              changeLanguage(languageName.toLowerCase()).catch((err) => {
                console.error('Failed to change language:', err);
              });
            },
            onError: (error) => {
              console.error('Failed to change language:', error);
            },
          }
        );
      }}
    >
      {languageName.toUpperCase()}
    </div>
  );

  return (
    <div className="flex justify-between flex-row py-[0.75rem] px-[1.5rem]">
      <p className="mt-0 mb-[1rem]">
        <label className="pt-[5px] leading-[1.47] inline-block">
          {t('topRibbon.user.language')}
        </label>
      </p>
      <div className="">
        <div className="pl-[2rem] flex ">
          <LanguageButton languageName={'EN'} />
          <LanguageButton languageName={'PL'} />
        </div>
      </div>
    </div>
  );
};

export default Langaugae;
