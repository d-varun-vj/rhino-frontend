import React from 'react';

type IconButtonProps = {
  children: React.ReactNode;
  style?: string;
  action: () => void;
  popupContent?: string;
  dataTestId?: string;
};

const IconButton = ({
  children,
  style,
  popupContent,
  action,
  dataTestId,
}: IconButtonProps) => {
  return (
    <div className="relative group inline-block">
      <button
        className={`font-bold px-4 py-2 rounded bg-rhino-energy-green text-white ${style}`}
        onClick={action}
        title={popupContent}
        data-testid={dataTestId}
      >
        {children}
      </button>
    </div>
  );
};

export default IconButton;
