import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

interface QuestionCircleProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  content: string;
}

const QuestionCircle = ({ content, ...props }: QuestionCircleProps) => {
  return (
    <span title={content} {...props}>
      <FaQuestionCircle className="text-rhino-indigo-blue w-7 h-7 cursor-pointer" />
    </span>
  );
};

export default QuestionCircle;
