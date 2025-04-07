import { FaQuestionCircle } from 'react-icons/fa';

const Title = ({
  title,
  guide = false,
  guideLink,
}: {
  title: string;
  guide?: boolean;
  guideLink?: string;
}) => {
  return (
    <div className="flex">
      <h1
        className="pl-0 ml-0 mb-[15px] text-left font-bold text-[32px] leading-[20px] tracking-[0]
        text-rhino-indigo-blue mt-[25px] flex items-center"
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

export default Title;
