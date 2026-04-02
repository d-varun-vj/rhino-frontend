import clsx from 'clsx';

type Heading = {
  content: string;
  variant?: 'sm' | 'lg' | 'xl' | '2xl';
  font?:
    | 'thin'
    | 'extralight'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'black';
  color?: string;
  className?: string;
};

const Heading = ({
  content,
  variant = 'lg',
  font = 'bold',
  color = 'rhino-indigo-blue',
  className,
}: Heading) => {
  return (
    <p
      className={clsx(
        `text-${color} font-${font} !leading-5 tracking-normal py-4 ${className}`,
        {
          'text-lg': variant == 'lg',
          'text-sm': variant == 'sm',
          'text-xl': variant == 'xl',
          'text-2xl': variant == '2xl',
        }
      )}
    >
      {content}
    </p>
  );
};

export default Heading;
