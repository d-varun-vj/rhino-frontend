import { changeLanguage } from 'i18next';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserCircle } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

import { VITE_WICKET_BASE_URL } from '@rhino/apis';
import { useUser } from 'apps/webapp/src/context/user';
import message from '../../../notifier';
import Language from './Language';

type Item = {
  label: string;
  action: ({ url }: { url?: string }) => void;
};

const items: Item[] = [
  {
    label: 'topRibbon.user.terms',
    action: () => {
      window.open(
        import.meta.env.VITE_TERMS_OF_USER_URL
          ? (import.meta.env.VITE_TERMS_OF_USER_URL as string)
          : '#'
      );
    },
  },
  {
    label: 'topRibbon.user.manual',
    action: () => {
      window.open('https://rhino.energy/en-us/analytics');
    },
  },
  {
    label: 'topRibbon.user.logout',
    action: () => {
      document.cookie =
        'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      window.location.href = VITE_WICKET_BASE_URL + '?-2.-logout';
    },
  },
];

const UserDropDown = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useUser();
  const {
    t,
    i18n: { language },
  } = useTranslation('layout');
  const { pathname } = useLocation();
  const languageRef = useRef(language);

  useEffect(() => {
    if (user?.language !== languageRef.current) {
      changeLanguage(user?.language).catch(() => {
        message.error(t('topRibbon.user.language.error'));
      });
    }
  }, [user]);

  return (
    <div className="flex justify-end mt-[.25rem] px-[.75rem] items-center h-[4.125rem] pr-[2.5rem] cursor-pointer">
      <button
        type="button"
        className={`${open ? 'bg-[#dae1e8]' : 'bg-transparent'}  w-[40px] h-[40px] flex items-center justify-center rounded-full`}
        onClick={() => setOpen(!open)}
        data-testid="user-drop-down-btn"
      >
        <FaUserCircle
          className={`${open ? 'text-[#404040]' : 'text-[#036983]'}  text-[21px] `}
        />
      </button>

      {/* drop down */}
      <button
        type="button"
        onMouseLeave={() => setOpen(false)}
        className={`${open ? 'block' : 'hidden'}`}
      >
        <div className="absolute bg-[#fff] w-[17.5rem] h-auto  top-[4.3rem] right-[4rem] left-auto p-0 m-0 min-w-[10rem] z-40 text-left text-[#212529] text-[0.8125rem] rounded shadow-lg">
          {/* Head */}
          <div className="bg-rhino-indigo-blue-light rounded-tl rounded-tr p-[1.5rem] text-[#868e96] text-[.75rem] whitespace-nowrap">
            {user ? (
              <>
                <div className="text-[#fff] text-[0.875rem] max-w-[200px] font-bold overflow-hidden text-ellipsis whitespace-nowrap ">
                  {user ? user?.firstName + user?.lastName : ''}
                </div>
                <div className="text-rhino-energy-green text-[0.75rem] max-w-[200px]  overflow-hidden text-ellipsis whitespace-nowrap">
                  {user?.email}
                </div>
              </>
            ) : (
              <div className="text-[#fff] text-[0.875rem] max-w-[200px] font-bold overflow-hidden text-ellipsis whitespace-nowrap ">
                Inactive User
              </div>
            )}
          </div>
          {/* Body */}
          {items.map((item, key) => (
            <React.Fragment key={key + item.label}>
              <div className="m-0 h-0 overflow-hidden border-t-[#f3f3f3] border-t-[1px]"></div>
              <button
                type="button"
                onClick={() => item.action({ url: pathname })}
                className="w-full text-start"
              >
                <div className="cursor-pointer w-full py-[0.75rem] px-[1.5rem] bg-transparent text-[#212529] whitespace-nowrap font-medium block hover:bg-gray-50 hover:text-rhino-indigo-blue">
                  {t(item.label)}
                </div>
              </button>
            </React.Fragment>
          ))}

          {/* Language section */}
          <Language />
        </div>
      </button>
    </div>
  );
};

export default UserDropDown;
