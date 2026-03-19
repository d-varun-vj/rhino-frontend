import clsx from 'clsx';
import { FaQuestionCircle } from 'react-icons/fa';

type PageTitleProps = {
  title: string;
  guide?: boolean;
  guideLink?: string;
  className?: string;
};

const PageTitle = ({
  title,
  className = '',
  guide = false,
  guideLink,
}: PageTitleProps) => {
  return (
    <div className="flex">
      <h1
        className={clsx(
          'pl-0 ml-0 mb-[15px] text-left font-bold text-[32px] tracking-[0] text-rhino-indigo-blue mt-[25px] flex items-center',
          {
            [className]: className,
          }
        )}
        data-testid="page-title"
      >
        {title}
        {guide && (
          <a
            href={`${guideLink}`}
            target="_blank"
            className="text-[18px] ml-2 cursor-pointer"
          >
            <FaQuestionCircle />
          </a>
        )}
      </h1>
    </div>
  );
};

export default PageTitle;
