import clsx from 'clsx';
import React from 'react';

type ButtonProps = {
  text?: string;
  type: 'primary' | 'secondary';
  className?: string;
  action: () => void;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
};

const Button = ({
  text,
  className,
  type = 'primary',
  action,
  icon,
  iconPosition = 'left',
}: ButtonProps) => {
  const ButtonClassName = clsx(
    'font-bold text-sm px-4 py-2 rounded',
    {
      'flex-row-reverse': iconPosition === 'left',
      'bg-rhino-energy-green text-white': type === 'primary',
      'bg-gray-500 hover:bg-gray-700 text-white': type === 'secondary',
      'flex items-center': !!icon,
    },
    className
  );
  return (
    <div className="relative group inline-block">
      <button className={ButtonClassName} onClick={action}>
        {text && <span>{text}</span>}
        {icon && iconPosition === 'left' && (
          <span className={text ? 'mr-2' : ''}>{icon}</span>
        )}
        {icon && iconPosition === 'right' && (
          <span className={text ? 'ml-2' : ''}>{icon}</span>
        )}
      </button>
    </div>
  );
};

export default Button;
