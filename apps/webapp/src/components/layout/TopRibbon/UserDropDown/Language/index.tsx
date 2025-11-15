import { Loader } from '@mantine/core';
import { DataQueryKeys, useChangeUserLanguage } from '@rhino/apis';
import { useQueryClient } from '@tanstack/react-query';
import message from 'apps/webapp/src/components/notifier';
import { useTranslation } from 'react-i18next';

const LanguageButton = ({
  languageName,
  handleClick,
  isPending,
}: {
  languageName: string;
  handleClick: (languageName: string) => void;
  isPending: boolean;
}) => {
  const { i18n } = useTranslation();

  return (
    <button
      type="button"
      className={`w-[35px] h-[35px] flex justify-center items-center rounded-[50%] bg-rhino-white mr-[10px] cursor-pointer hover:text-rhino-indigo-blue-light ${languageName.toLowerCase() === i18n.language ? 'text-rhino-indigo-blue border-[2px] border-rhino-indigo-blue' : 'text-black  border-black opacity-[0.2]'}`}
      onClick={() => handleClick(languageName)}
    >
      {isPending ? (
        <Loader size="sm" color="var(--color-rhino-indigo-blue)" />
      ) : (
        languageName.toUpperCase()
      )}
    </button>
  );
};

const Language = () => {
  const { t, i18n } = useTranslation('layout');
  const { t: tCommon } = useTranslation('common');
  const changeLanguage = i18n.changeLanguage.bind(i18n);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useChangeUserLanguage();

  const handleClick = (languageName: string) => {
    mutate(
      { lang: languageName.toLowerCase() },
      {
        onSuccess: () => {
          changeLanguage(languageName.toLowerCase())
            .then(() => {
              message.success(tCommon('toast.languageChanged.success'));
              void queryClient.invalidateQueries({
                queryKey: [DataQueryKeys.USER],
              });
              void queryClient.refetchQueries({
                queryKey: [DataQueryKeys.MEASUREMENT_INFO],
              });
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
          <LanguageButton
            languageName={'EN'}
            handleClick={handleClick}
            isPending={isPending}
          />
          <LanguageButton
            languageName={'PL'}
            handleClick={handleClick}
            isPending={isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default Language;
