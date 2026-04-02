import clsx from 'clsx';

type SubTitleProps = {
  content: string;
  variant?: 'sm' | 'lg' | 'xl';
  color?: string;
  className?: string;
};
const SubTitle = ({
  content,
  variant = 'xl',
  color = 'rhino-grey',
  className,
}: SubTitleProps) => {
  return (
    <p
      className={clsx(`text-${color} ${className}`, {
        'text-lg': variant == 'lg',
        'text-sm': variant == 'sm',
        'text-xl': variant == 'xl',
      })}
    >
      {content}
    </p>
  );
};

export default SubTitle;
