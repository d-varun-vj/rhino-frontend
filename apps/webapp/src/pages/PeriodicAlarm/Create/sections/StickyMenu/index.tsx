import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SIDE_STICKY_MENU_ITEMS } from '../../config';

const StickyMenu = () => {
  const { t } = useTranslation('periodicAlarm');
  const [activeId, setActiveId] = useState('basic-information');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            setActiveId(id);
          }
          break;
        }
      }
    };

    const options = {
      root: null,
      rootMargin: '0px 0px -90% 0px',
      threshold: 0,
    };

    observer.current = new IntersectionObserver(handleIntersect, options);

    SIDE_STICKY_MENU_ITEMS.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        observer.current?.observe(section);
      }
    });

    return () => observer.current?.disconnect();
  }, []);

  return (
    <div className="w-78 min-lg:block hidden">
      <div className="rounded border-[1px] border-black/8 w-78 p-4 pb-16 shadow sticky top-8">
        {SIDE_STICKY_MENU_ITEMS.map((item) => (
          <button
            type="button"
            className={clsx(
              'rounded py-3 px-4 text-nowrap   w-full cursor-pointer text-start',
              {
                'bg-[#D9EAFF] text-rhino-indigo-blue': activeId === item.id,
              }
            )}
            key={item.id}
            onClick={() => {
              document
                .getElementById(item.id)
                ?.scrollIntoView({ behavior: 'smooth' });
              setActiveId(item.id);
            }}
          >
            <span className="text-[14px] font-medium">{t(item.label)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StickyMenu;
