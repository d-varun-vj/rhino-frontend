import clsx from 'clsx';

type Heading = {
  content: string;
  variant?: 'sm' | 'lg';
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
};

const Heading = ({
  content,
  variant = 'lg',
  font = 'bold',
  color = 'rhino-indigo-blue',
}: Heading) => {
  return (
    <p
      className={clsx(
        `text-${color} font-${font} !leading-5 tracking-normal py-4 `,
        {
          'text-lg': variant == 'lg',
          'text-sm': variant == 'sm',
        }
      )}
    >
      {content}
    </p>
  );
};

export default Heading;
